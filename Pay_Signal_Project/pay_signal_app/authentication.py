from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Extract the token from cookies
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            print("No access token found in cookies.")
            return None  # No token provided, skip authentication
        
        try:
            # Log the token validation process
            print(f"Access Token found: {access_token}")
            validated_token = self.get_validated_token(access_token)
            print("Token successfully validated.")

            # Retrieve the user from the validated token
            user = self.get_user(validated_token)
            if user is not None:
                print(f"Authenticated User: {user.username}")
                return (user, validated_token)
            else:
                print("No user found for the validated token.")
                return None
        except AuthenticationFailed as e:
            # Log any token validation or user retrieval errors
            print(f"Authentication failed: {str(e)}")
            return None
