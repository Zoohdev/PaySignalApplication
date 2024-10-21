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
