from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ConfirmationCode, Account, Transaction
from django.utils.timezone import now


User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'firstname', 'middlename', 'lastname', 'phone_number', 'date_of_birth', 'country']

    def create(self, validated_data):
        """
        Create a new user with hashed password.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            firstname=validated_data.get('firstname'),
            middlename=validated_data.get('middlename'),
            lastname=validated_data.get('lastname'),
            phone_number=validated_data['phone_number'],
            date_of_birth=validated_data['date_of_birth'],
            country=validated_data['country'],
        )
        return user

    
    
class UserRegistrationView(APIView):
    """
    API View for user registration.
    """
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully. Please verify your email."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class LoginSerializer(serializers.Serializer):
    """
    Serializer for login.
    """
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            raise serializers.ValidationError("Both username and password are required.")

        user = User.objects.filter(username=username).first()
        if not user or not user.check_password(password):
            raise serializers.ValidationError("Invalid username or password.")

        return data
    
class ConfirmationCodeSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=8)

    def validate_code(self, value):
        try:
            confirmation_code = ConfirmationCode.objects.get(code=value)
        except ConfirmationCode.DoesNotExist:
            raise serializers.ValidationError("Invalid confirmation code.")

        # Check if the code has expired
        if confirmation_code.expires_at < now():
            raise serializers.ValidationError("Confirmation code has expired.")

        return value


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['account_id', 'account_number', 'balance', 'currency', 'date_opened', 'account_type']
        read_only_fields = ['account_id', 'account_number', 'balance', 'date_opened']