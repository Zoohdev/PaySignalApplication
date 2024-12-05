from datetime import timedelta
import random
import uuid
from django.utils.timezone import now
from .models import EmailVerificationToken, ConfirmationCode, ConversionRate
from django.core.mail import send_mail
from django.conf import settings
from decimal import Decimal


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

def generate_confirmation_code(user):
    # Generate a random 8-digit code
    code = f"{random.randint(10000000, 99999999)}"

    # Set expiration to 15 minutes
    expires_at = now() + timedelta(minutes=15)

    # Save to the database
    ConfirmationCode.objects.create(user=user, code=code, expires_at=expires_at)

    # Send the code via email
    subject = "Your Confirmation Code"
    message = f"Your confirmation code is: {code}. It is valid for 15 minutes."
    send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [user.email])

    return code

# Example currency exchange rates (replace with API integration for real-world use)
EXCHANGE_RATES = {
    ('USD', 'EUR'): 0.85,
    ('EUR', 'USD'): 1.18,
    ('USD', 'GBP'): 0.75,
    ('GBP', 'USD'): 1.33,
    # Add more currency pairs as needed
}

def convert_currency(base_currency, target_currency, amount):
    try:
        conversion_rate = ConversionRate.objects.get(
            base_currency=base_currency,
            target_currency=target_currency
        )
        converted_amount = round(Decimal(amount) * conversion_rate.rate, 2)
        return converted_amount, conversion_rate.rate
    except ConversionRate.DoesNotExist:
        raise ValueError(f"Conversion rate from {base_currency} to {target_currency} not available.")