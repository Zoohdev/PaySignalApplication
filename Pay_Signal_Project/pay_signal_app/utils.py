from datetime import timedelta
from django.utils.timezone import now
from .models import EmailVerificationToken
import uuid


def generate_email_verification_token(user):
    """
    Generate a unique email verification token for the specified user.
    """
    # Create a new unique token
    token = EmailVerificationToken.objects.create(user=user, token=uuid.uuid4())
    return token.token


def is_token_valid(token):
    """
    Validate the token:
    - Check if it exists
    - Ensure it is not expired
    - Ensure it has not been used
    """
    try:
        token_obj = EmailVerificationToken.objects.get(token=token)
    except EmailVerificationToken.DoesNotExist:
        return False, "Invalid token."

    # Check if token is expired
    if token_obj.created_at + timedelta(minutes=10) < now():
        return False, "Token has expired."

    # Check if token is already used
    if token_obj.is_used:
        return False, "Token has already been used."

    return True, token_obj


def cleanup_expired_tokens():
    """
    Delete all expired tokens from the database.
    Tokens are considered expired if they are older than 10 minutes.
    """
    expiry_time = now() - timedelta(minutes=10)
    expired_tokens = EmailVerificationToken.objects.filter(created_at__lt=expiry_time)
    count = expired_tokens.delete()[0]  # Returns a tuple: (number of objects deleted, _)
    return count
