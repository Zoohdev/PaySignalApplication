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
