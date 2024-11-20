from datetime import timedelta
from django.utils.timezone import now
from .models import EmailVerificationToken
import uuid
from django.core.mail import send_mail
from django.conf import settings

def generate_email_verification_token(user):
    """
    Generate a unique token for email verification.
    """
    token = EmailVerificationToken.objects.create(user=user, token=str(uuid.uuid4()), created_at=now())
    return token.token

def send_verification_email(email, token):
    """
    Send an email verification link.
    """
    verification_url = f"http://localhost:8000/api/users/verify-email/?token={token}"
    subject = "Verify Your Email"
    message = f"Please verify your email by clicking this link: {verification_url}"
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])

def send_action_confirmation_email(email, token):
    """
    Send a confirmation email post-login.
    """
    confirmation_url = f"http://localhost:8000/api/users/confirm-action/?token={token}"
    subject = "Confirm Your Action"
    message = f"To confirm your action, please click this link (valid for 15 minutes): {confirmation_url}"
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])
