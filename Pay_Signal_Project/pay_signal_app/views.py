'''from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm, UserChangeForm
from django.contrib.auth import login as auth_login, update_session_auth_hash, logout
from django.contrib import messages
from django.db import transaction
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from .forms import UserRegistrationForm, AccountForm, TransferFundsForm, DepositForm, ProfileEditForm
from .token import email_verification_token
from .models import Account, Transaction

# Home page view
def home(request):
    return render(request, "home.html")

# User registration view
def register(request):
    if request.method == "POST":
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_verified_status = False  # Account inactive until email verified
            user.save()

            # Email verification process
            current_site = get_current_site(request)
            subject = 'Activate Your Account'
            uid = urlsafe_base64_encode(force_bytes(user.uuid))
            token = email_verification_token.make_token(user)
            activation_link = reverse('activate', kwargs={'uidb64': uid, 'token': token})
            activation_url = f'http://127.0.0.1:8000{activation_link}'
            message = f'Hello {user.username},\n\nPlease use this link to verify your account:\n{activation_url}'

            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )

            messages.success(request, 'Please confirm your email address to complete registration.')
            return redirect("login")
        else:
            messages.error(request, 'An error occurred during registration. Please correct the errors below.')
    else:
        form = UserRegistrationForm()
    return render(request, "register.html", {"form": form})

# Login view with email verification check
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()

            # Check if the user is verified
            if not user.is_verified_status:
                messages.error(request, 'Your email is not verified. Please verify your email.')
                return redirect('resend_verification_email', user_id=user.pk)  # Pass the user's ID for resending verification
            else:
                auth_login(request, user)
                messages.success(request, 'Login successful!')
                return redirect('home')
        else:
            messages.error(request, 'Invalid username or password.')
    else:
        form = AuthenticationForm()

    # If the user is already logged in or exists, pass them to the template
    user = request.user if request.user.is_authenticated else None
    return render(request, 'login.html', {'form': form, 'user': user})

# Activate account through verification email
def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = get_user_model().objects.get(uuid=uid)
    except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
        user = None

    if user and email_verification_token.check_token(user, token):
        user.is_verified_status = True  # Mark the user as verified
        user.save()
        messages.success(request, 'Your account has been activated! You can now log in.')
        return redirect('login')
    else:
        messages.error(request, 'The activation link is invalid or expired.')
        return redirect('register')

# Resend verification email
def resend_verification_email(request, user_id):
    user = get_object_or_404(get_user_model(), pk=user_id)
    
    if not user.is_verified_status:
        current_site = get_current_site(request)
        subject = 'Resend Email Verification'
        uid = urlsafe_base64_encode(force_bytes(user.uuid))
        token = email_verification_token.make_token(user)
        activation_link = reverse('activate', kwargs={'uidb64': uid, 'token': token})
        activation_url = f'http://127.0.0.1:8000{activation_link}'
        message = f'Hello {user.username},\n\nPlease use this link to verify your account:\n{activation_url}'
        
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )
        messages.success(request, 'A verification email has been resent to your email address.')
    else:
        messages.info(request, 'Your account is already verified.')

    return redirect('login')


@login_required
def create_account(request):
    if request.method == 'POST':
        form = AccountForm(request.POST)
        if form.is_valid():
            account = form.save(commit=False)
            account.user = request.user
            account.save()
            return redirect('account_list')  # Redirect to a list of user accounts
    else:
        form = AccountForm()
    return render(request, 'create_account.html', {'form': form})


@login_required
def account_list(request):
    accounts = Account.objects.filter(user=request.user)  # Filter accounts for the logged-in user
    return render(request, 'account_list.html', {'accounts': accounts})

@login_required
def transfer_funds(request, account_id):
    sender_account = get_object_or_404(Account, id=account_id, user=request.user)
    if request.method == 'POST':
        form = TransferFundsForm(request.POST, sender_account=sender_account)
        if form.is_valid():
            recipient_account_number = form.cleaned_data.get('recipient_account_number')
            amount = form.cleaned_data.get('amount')
            if not recipient_account_number or not amount:
                messages.error(request, "Invalid form data.")
                return redirect('transfer_funds', account_id=sender_account.id)
            try:
                recipient_account = Account.objects.get(account_number=recipient_account_number)
            except Account.DoesNotExist:
                messages.error(request, "The recipient account number is invalid.")
                return redirect('transfer_funds', account_id=sender_account.id)
            if sender_account.balance < amount:
                messages.error(request, "Insufficient balance for this transfer.")
                return redirect('transfer_funds', account_id=sender_account.id)
            try:
                with transaction.atomic():
                    sender_account.balance -= amount
                    sender_account.save()
                    recipient_account.balance += amount
                    recipient_account.save()
                    # Create transactions for sender and recipient
                    Transaction.objects.create(
                        account=sender_account,
                        recipient_account_number=recipient_account.account_number,
                        recipient_name=recipient_account.user.username,
                        amount=amount,
                        transaction_type='Transfer',
                        description=f'Transfer to {recipient_account.user.username}'
                    )
                    Transaction.objects.create(
                        account=recipient_account,
                        recipient_account_number=sender_account.account_number,
                        recipient_name=sender_account.user.username,
                        amount=amount,
                        transaction_type='Deposit',
                        description=f'Received from {sender_account.user.username}'
                    )
                messages.success(request, f'Successfully transferred {amount} to {recipient_account.user.username}.')
                return redirect('account_detail', account_id=sender_account.id)
            except Exception as e:
                messages.error(request, f"An error occurred during the transfer: {e}")
                return redirect('transfer_funds', account_id=sender_account.id)
    else:
        form = TransferFundsForm(sender_account=sender_account)
    return render(request, 'transfer_funds.html', {'form': form, 'account': sender_account})

@login_required
def transaction_list(request, account_id):
    account = get_object_or_404(Account, id=account_id, user=request.user)  # Ensure the account belongs to the logged-in user
    transactions = Transaction.objects.filter(account=account)  # Filter transactions for the account
    return render(request, 'transaction_list.html', {'account': account, 'transactions': transactions})

def transaction_receipt(request, transaction_id):
    transaction = Transaction.objects.get(transaction_id=transaction_id)
    return render(request, 'transaction_receipt.html', {transaction_id:transaction.transaction_id})

@login_required
def fund_account(request, account_id):
    account = get_object_or_404(Account, id=account_id)

    if request.method == "POST":
        form = DepositForm(request.POST)
        if form.is_valid():
            amount = form.cleaned_data['amount']
            account.balance += amount
            account.save()

            # Create the funding transaction
            Transaction.objects.create(
                account=account,
                amount=amount,
                transaction_type='Deposit',  # Marking this transaction as a 'Deposit'
                description='Account funding'
            )

            messages.success(request, "Account successfully funded!")
            return redirect('account_detail', account_id=account.id)
    else:
        form = DepositForm()

    return render(request, 'fund_account.html', {'account': account, 'form': form})

@login_required
def transaction_history(request, account_id):
    account = Account.objects.get(id=account_id)
    transactions = account.transactions.all().order_by('-date_of_transaction')  # Order by most recent

    return render(request, 'transaction_history.html', {
        'account': account,
        'transactions': transactions
    })

def account_detail(request, account_id):
    account = get_object_or_404(Account, id=account_id)
    context = {
        'account': account
    }
    return render(request, 'account_detail.html', {'account': account})



def logout_view(request):
    logout(request)
    return redirect('login')  # Redirect to login page after logout


@login_required
def user_dashboard(request):
    # Get accounts associated with the logged-in user
    user_accounts = Account.objects.filter(user=request.user)

    # Retrieve transactions for these accounts
    transactions = Transaction.objects.filter(account__in=user_accounts).order_by('-date_of_transaction')[:10]

    context = {
        'transactions': transactions,
        'user_accounts': user_accounts,
    }
    return render(request, 'dashboard.html', context)

@login_required
def edit_profile(request):
    user = request.user
    old_email = user.email  # Store the original email to compare

    if request.method == 'POST':
        form = ProfileEditForm(request.POST, instance=user)
        if form.is_valid():
            updated_user = form.save(commit=False)
            new_email = form.cleaned_data['email']

            # Check if the email was changed
            if new_email != old_email:
                updated_user.is_verified_status = False  # Set as unverified for new email
                updated_user.save()

                # Generate verification email
                current_site = get_current_site(request)
                subject = 'Verify Your New Email Address'
                uid = urlsafe_base64_encode(force_bytes(updated_user.uuid))
                token = email_verification_token.make_token(updated_user)
                activation_link = reverse('activate', kwargs={'uidb64': uid, 'token': token})
                activation_url = f'http://127.0.0.1:8000{activation_link}'
                message = f'Hello {updated_user.username},\n\nPlease verify your new email address by clicking the link:\n{activation_url}'

                send_mail(
                    subject,
                    message,
                    settings.EMAIL_HOST_USER,
                    [new_email],
                    fail_silently=False,
                )

                messages.success(request, "Profile updated successfully. Please verify your new email address.")
            else:
                updated_user.save()  # Save normally if email hasn't changed
                messages.success(request, "Profile updated successfully.")
            return redirect('dashboard')
        else:
            messages.error(request, "Please correct the errors below.")
    else:
        form = ProfileEditForm(instance=user)

    # Additional uneditable fields to display
    uneditable_fields = {
        'date_of_birth': user.date_of_birth,
        'date_joined': user.date_joined,
        'firstname': user.firstname,
        'middlename': user.middlename,
        'lastname': user.lastname,
        'country': user.country,
        'currency': user.currency,
        'is_verified_status': user.is_verified_status,
        'accounts': user.accounts.all(),  # To display associated accounts, if needed
    }

    context = {
        'form': form,
        'uneditable_fields': uneditable_fields,
    }
    return render(request, 'edit_profile.html', context)'''
    
    

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import  permission_classes
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login
from django.conf import settings
from decimal import Decimal
from django.utils.timezone import now, timedelta
from .serializers import UserRegistrationSerializer, TransactionSerializer, LoginSerializer,  ConfirmationCodeSerializer, AccountSerializer, TransactionPreviewSerializer
from .models import User,Transaction, EmailVerificationToken, ConfirmationCode, Account
from .utils import generate_email_verification_token, generate_confirmation_code,  send_action_confirmation_email, calculate_charges, convert_currency, validate_currency_pair, format_transaction_preview
import logging
from django.db import transaction as db_transaction
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError


logger = logging.getLogger(__name__)

class UserRegistrationView(APIView):
    """
    API View for user registration and sending email verification.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate email verification token
            token = generate_email_verification_token(user)

            # Build verification URL
            verification_url = f"http://localhost:8000/api/users/verify-email/?token={token}"

            # Send verification email
            try:
                send_mail(
                    subject="Verify Your Email",
                    message=f"Hi {user.username},\n\nPlease click the link below to verify your email:\n{verification_url}",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[user.email],
                )
            except Exception as e:
                logger.error(f"Failed to send email to {user.email}: {e}")
                return Response(
                    {"error": "User registered, but email could not be sent."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            return Response(
                {"message": "User registered successfully. Please verify your email."},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    """
    API View for verifying email using a token.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        token_value = request.GET.get("token")
        if not token_value:
            return Response({"error": "Token is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Get the token object from the database
        try:
            token_obj = EmailVerificationToken.objects.get(token=token_value)
        except EmailVerificationToken.DoesNotExist:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the token is expired (30 minutes max)
        token_age = now() - token_obj.created_at
        logger.debug(f"Token created at: {token_obj.created_at}, Token age: {token_age}")

        # If token is older than 30 m, it's expired
        if token_age > timedelta(minutes=30):
            return Response({"error": "Token has expired."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the token has already been used
        if token_obj.is_used:
            return Response({"error": "Token has already been used."}, status=status.HTTP_400_BAD_REQUEST)

        # Mark the token as used
        token_obj.is_used = True
        token_obj.save()

        # Activate the user and mark the email as verified
        user = token_obj.user
        user.is_verified_status = True  # Ensure the correct field for user verification status
        user.save()

        return Response({"message": "Email verified successfully!"}, status=status.HTTP_200_OK)
    
    
class LoginView(APIView):
    """
    Handles user login and sends a confirmation code to the user's email.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get("username")
        password = serializer.validated_data.get("password")

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "No account found with the given username."}, status=status.HTTP_404_NOT_FOUND)

        if not user.check_password(password):
            return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_verified_status:
            return Response({"error": "Email not verified. Please verify your email first."}, status=status.HTTP_403_FORBIDDEN)

        # Generate confirmation code and send it to the user's email
        code = generate_confirmation_code(user)
        send_action_confirmation_email(user.email, code)

        return Response(
            {"message": "A confirmation code has been sent to your email."},
            status=status.HTTP_200_OK,
        )

from django.contrib.auth import login



class ConfirmActionView(APIView):
    """
    Handles confirmation via a code and logs in the user automatically.
    Accepts both POST and GET requests.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        token = request.GET.get("token")
        if not token:
            return Response({"error": "Token is required."}, status=400)

        try:
            confirmation_code = ConfirmationCode.objects.get(code=token)
        except ConfirmationCode.DoesNotExist:
            return Response({"error": "Invalid confirmation code."}, status=400)

        if confirmation_code.expires_at < now():
            return Response({"error": "Confirmation code has expired."}, status=400)

        user = confirmation_code.user
        confirmation_code.delete()  # Invalidate the code after use
        
        
        # Log the user in using Django's authentication system
        login(request, user)

        # Generate tokens and log the user in
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Set cookies with tokens
        response = Response(
            {"message": "Action confirmed and user logged in successfully!"},
            status=200,
        )
        response.set_cookie(
            "access_token", access_token, httponly=True, secure=True, samesite="Lax"
        )
        response.set_cookie(
            "refresh_token", str(refresh), httponly=True, secure=True, samesite="Lax"
        )
        return response

    def post(self, request):
        serializer = ConfirmationCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.validated_data.get("code")

        try:
            confirmation_code = ConfirmationCode.objects.get(code=code)
        except ConfirmationCode.DoesNotExist:
            return Response({"error": "Invalid confirmation code."}, status=400)

        if confirmation_code.expires_at < now():
            return Response({"error": "Confirmation code has expired."}, status=400)

        user = confirmation_code.user
        confirmation_code.delete()  # Invalidate the code after use

        # Generate tokens and log the user in
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        
        
        # Log the user in using Django's authentication system
        login(request, user)

        # Set cookies with tokens
        response = Response(
            {"message": "Action confirmed and user logged in successfully!"},
            status=200,
        )
        response.set_cookie(
            "access_token", access_token, httponly=True, secure=True, samesite="Lax"
        )
        response.set_cookie(
            "refresh_token", str(refresh), httponly=True, secure=True, samesite="Lax"
        )
        return response



class LogoutView(APIView):
    """
    Handles user logout by blacklisting the refresh token.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token
            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CookieTokenRefreshView(TokenRefreshView):
    """
    Custom view to refresh tokens and update cookies.
    """
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response({"error": "Refresh token not found."}, status=400)

        request.data['refresh'] = refresh_token  # Inject refresh token into request data
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data["access"]
            response.set_cookie(
                "access_token", access_token, httponly=True, secure=True, samesite="Lax"
            )
        return response
    
'''class CreateAccountView(CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Ensure the user cannot create more than 5 accounts
        user = self.request.user  # Get the authenticated user
        if user.accounts.count() >= 5:
            return Response(
                {"error": "A user can only create up to 5 accounts."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Extract user's first and last name
        first_name = user.firstname or "First Name"
        last_name = user.lastname or "Last Name"
        
        print(f"Creating account for user: {first_name} {last_name}")

        # Save the account linked to the user
        serializer.save(user=user)
'''

'''class CreateTransactionView(generics.CreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user

        # Fetch sender's account
        sender_account = Account.objects.filter(user=user).first()
        if not sender_account:
            raise ValidationError({"error": "You must have a valid account to perform transactions."})

        # Preview the transaction
        preview_serializer = TransactionPreviewSerializer(data=request.data)
        if not preview_serializer.is_valid():
            return Response(preview_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        preview_data = preview_serializer.data  # Preview details

        # Display preview to the user
        response_data = {"preview": preview_data}

        # Commit the transaction only if 'confirm' is in request data
        if request.data.get("confirm", False):
            transaction_serializer = self.get_serializer(data=request.data)
            transaction_serializer.is_valid(raise_exception=True)

            # Ensure sufficient balance before committing
            amount = transaction_serializer.validated_data["amount"]
            if sender_account.balance < amount:
                raise ValidationError({"error": "Insufficient balance."})

            # Save transaction
            transaction_serializer.save(sender_account=sender_account)
            response_data["transaction"] = transaction_serializer.data

        return Response(response_data, status=status.HTTP_200_OK)'''
        
        
class CreateAccountView(generics.CreateAPIView):
    """
    API view to create a new account.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        
        
        # Ensure the user cannot create more than 5 accounts
        if user.accounts.count() >= 5:
            raise ValidationError({"error": "A user can only create up to 5 accounts."})

        # Save the account linked to the user
        serializer.save(user=user)


class TransactionPreviewAPIView(APIView):
    """
    API endpoint to preview transaction details.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Fetch the sender's account associated with the authenticated user
        sender_account = Account.objects.filter(user=user).first()
        if not sender_account:
            return Response(
                {"error": "Sender account not found for the authenticated user."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Pass data to serializer
        serializer = TransactionPreviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        receiver_account = serializer.validated_data['receiver_account']
        amount = serializer.validated_data['amount']

        # Handle currency conversion and charges
        same_currency = sender_account.currency == receiver_account.currency
        if same_currency:
            converted_amount = amount
            charges = calculate_charges(amount, same_currency=True)
        else:
            try:
                converted_amount, _ = convert_currency(
                    sender_account.currency, receiver_account.currency, amount
                )
                charges = calculate_charges(converted_amount, same_currency=False)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        total = converted_amount + charges

        # Format response
        preview_data = format_transaction_preview(
            sender_account.currency, receiver_account.currency,
            amount, converted_amount, charges, total
        )
        return Response(preview_data, status=status.HTTP_200_OK)


class CreateTransactionView(generics.CreateAPIView):
    """
    API view to create a transaction after confirmation.
    """
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user

        # Fetch sender account associated with the authenticated user
        sender_account = Account.objects.filter(user=user).first()
        if not sender_account:
            return Response(
                {"error": "Sender account not found for the authenticated user."},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Copy request data and pass sender account to the serializer context
        serializer = self.get_serializer(
            data=request.data, context={'sender_account': sender_account}
        )
        serializer.is_valid(raise_exception=True)

        # Extract validated data
        receiver_account = serializer.validated_data['receiver_account']
        amount = serializer.validated_data['amount']
        confirm = serializer.validated_data.get('confirm', False)

        # Handle currency conversion and charges
        same_currency = sender_account.currency == receiver_account.currency
        if same_currency:
            converted_amount = amount
            charges = calculate_charges(amount, same_currency=True)
        else:
            try:
                converted_amount, _ = convert_currency(
                    sender_account.currency, receiver_account.currency, amount
                )
                charges = calculate_charges(converted_amount, same_currency=False)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        total = converted_amount + charges

        if confirm:
            # Perform the transaction
            try:
                with db_transaction.atomic():
                    if sender_account.balance < total:
                        return Response({"error": "Insufficient funds."}, status=status.HTTP_400_BAD_REQUEST)

                    # Deduct from sender and credit to receiver
                    sender_account.balance -= total
                    receiver_account.balance += converted_amount
                    sender_account.save()
                    receiver_account.save()

                    # Save transaction
                    completed_transaction = serializer.save(
                        converted_amount=converted_amount,
                        charges=charges,
                        status='COMPLETED',
                    )

                # Return the transaction details
                return Response(
                    {"transaction": TransactionSerializer(completed_transaction).data},
                    status=status.HTTP_201_CREATED
                )
            except Exception as e:
                return Response(
                    {"error": f"Transaction failed: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        else:
            # Return preview details if not confirmed
            preview_data = {
                "amount": f"{amount} {sender_account.currency}",
                "converted_amount": f"{converted_amount} {receiver_account.currency}",
                "charges": f"{charges} {receiver_account.currency}",
                "total": f"{total} {receiver_account.currency}"
            }
            return Response(preview_data, status=status.HTTP_200_OK)
