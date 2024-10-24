from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm
from django.contrib.auth import login as auth_login, update_session_auth_hash
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.decorators import login_required
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from .forms import UserRegistrationForm
from .token import email_verification_token
from .models import Account, Transaction
from .forms import AccountForm, TransactionForm

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
def create_transaction(request, account_id):
    account = Account.objects.get(id=account_id)
    
    if request.method == 'POST':
        form = TransactionForm(request.POST)
        
        if form.is_valid():
            recipient_account_number = form.cleaned_data['recipient_account_number']
            amount = form.cleaned_data['amount']
            user_account = Account.objects.get(id=account_id)

            # Validate the amount is greater than 0 and does not exceed user balance
            if amount <= 0:
                messages.error(request, "Amount must be greater than zero.")
                return render(request, 'create_transaction.html', {'form': form, 'account': account})
            
            if amount > user_account.balance:
                messages.error(request, "Insufficient balance for this transaction.")
                return render(request, 'create_transaction.html', {'form': form, 'account': account})
            
            # Check if the recipient account exists based on the account_number
            try:
                recipient_account = Account.objects.get(account_number=recipient_account_number)
                
                # Create the transaction
                transaction = Transaction.objects.create(
                    account=user_account,
                    recipient_account_number=recipient_account.account_number,
                    recipient_name=recipient_account.user.username,  # Show recipient's name
                    amount=amount,
                    transaction_type="Transfer",
                    user_phone=user_account.user.phone_number,
                    user_location="User Location"  # Optionally, dynamically set the user's location
                )

                # Deduct the amount from the sender's account balance
                user_account.balance -= amount
                user_account.save()

                # Redirect to receipt view with transaction ID
                return redirect('transaction_receipt', transaction_id=transaction.transaction_id)

            except Account.DoesNotExist:
                messages.error(request, "User not registered.")
                return render(request, 'create_transaction.html', {'form': form, 'account': account})
    
    else:
        form = TransactionForm()
    
    return render(request, 'create_transaction.html', {'form': form, 'account': account})
@login_required
def transaction_list(request, account_id):
    """
    Displays a list of transactions for a given account, belonging to the logged-in user.

    :param request: The HTTP request
    :param account_id: The ID of the account for which to show transactions
    :return: An HTTP response with a rendered template
    """
    account = get_object_or_404(Account, id=account_id, user=request.user)  # Ensure the account belongs to the logged-in user
    transactions = Transaction.objects.filter(account=account)  # Filter transactions for the account
    return render(request, 'transaction_list.html', {'account': account, 'transactions': transactions})


def transaction_receipt(request, transaction_id):
    transaction = Transaction.objects.get(transaction_id=transaction_id)
    return redirect('transaction_receipt', transaction_id=transaction.transaction_id)
