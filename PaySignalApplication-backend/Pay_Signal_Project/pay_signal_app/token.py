from django.contrib.auth.tokens import PasswordResetTokenGenerator
from six import text_type

class EmailVerificationTokenGenerator(PasswordResetTokenGenerator):
    
    def _make_hash_value(self, user, timestamp):
        """
        Returns a hash value for the given user based on the user's primary key and
        the given timestamp as well as the user's active status. The hash is used to
        ensure that the user's email address has not changed since the token was
        generated. The hash is also used to ensure the user is active. The resulting
        hash is a string that can be used to generate a unique token.
        """
        
        return text_type(user.pk) + text_type(timestamp) + text_type(user.is_active)

email_verification_token = EmailVerificationTokenGenerator()
