'''from datetime import timedelta
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
        raise ValueError(f"Conversion rate from {base_currency} to {target_currency} not available.")'''
        
        
        
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

DUMMY_CONVERSION_RATES = {
    "USD": {"USD": 1, "GBP": 0.8, "NGN": 760, "ZAR": 18},
    "GBP": {"USD": 1.25, "GBP": 1, "NGN": 950, "ZAR": 23},
    "NGN": {"USD": 0.0013, "GBP": 0.0011, "NGN": 1, "ZAR": 0.025},
    "ZAR": {"USD": 0.055, "GBP": 0.045, "NGN": 40, "ZAR": 1},
}


def convert_currency(base_currency, target_currency, amount):
    """
    Convert an amount from one currency to another, prioritizing database rates.
    If a rate is not found in the database, fall back to dummy rates.
    """
    try:
        # Try to fetch conversion rate from the database
        conversion_rate = ConversionRate.objects.get(
            base_currency=base_currency,
            target_currency=target_currency
        )
        rate = conversion_rate.rate
    except ConversionRate.DoesNotExist:
        # Fall back to dummy rates if database rate is unavailable
        try:
            rate = DUMMY_CONVERSION_RATES[base_currency][target_currency]
        except KeyError:
            raise ValueError(f"Conversion rate from {base_currency} to {target_currency} is not available.")
    
    # Perform the conversion
    converted_amount = round(Decimal(amount) * Decimal(rate), 2)
    return converted_amount, rate

def calculate_charges(amount, same_currency):
    """
    Calculate transaction charges:
    - 2% for same currency
    - 3% for different currencies
    """
    charge_rate = Decimal('0.02') if same_currency else Decimal('0.03')
    charges = round(amount * charge_rate, 2)
    return charges

'''def validate_currency_pair(sender_currency, receiver_currency):
    """
    Validate if a conversion rate exists for the given currency pair.
    """
    if sender_currency == receiver_currency:
        return True
    try:
        ConversionRate.objects.get(base_currency=sender_currency, target_currency=receiver_currency)
        return True
    except ConversionRate.DoesNotExist:
        return False'''
        
        
def validate_currency_pair(base_currency, target_currency):
    """
    Validates if the currency pair is supported.
    """
    if base_currency not in DUMMY_CONVERSION_RATES or target_currency not in DUMMY_CONVERSION_RATES[base_currency]:
        raise ValueError(f"Currency conversion from {base_currency} to {target_currency} is not supported.")


def format_transaction_preview(sender_currency, receiver_currency, amount, converted_amount, charges, total):
    """
    Format transaction details for the preview message.
    """
    if sender_currency == receiver_currency:
        return {
            "amount": f"{amount} {sender_currency}",
            "to": "Receiver details here (to be populated dynamically)",
            "receiver_will_receive": f"{converted_amount} {receiver_currency}",
            "charges": f"{charges} {sender_currency}",
            "total": f"{total} {sender_currency}"
        }
    else:
        return {
            "amount": f"{amount} {sender_currency}",
            "to": "Receiver details here (to be populated dynamically)",
            "receiver_will_receive": f"{converted_amount} {receiver_currency}",
            "charges": f"{charges} {receiver_currency}",
            "total": f"{total} {receiver_currency}"
    }



