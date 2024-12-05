from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ConfirmationCode, Account, Transaction
from django.utils.timezone import now
from rest_framework.exceptions import ValidationError
from .utils import convert_currency  # Import the conversion function


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
        fields = ['id', 'account_type', 'currency', 'balance', 'account_number', 'created_at', 'updated_at']
        read_only_fields = ['id', 'balance', 'account_number', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Add the user to the validated data
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)
    
    
class TransactionSerializer(serializers.ModelSerializer):
    receiver_account_number = serializers.CharField(write_only=True)  # Input for receiver
    receiver_account = serializers.HiddenField(default=None)  # Resolved in validation

    class Meta:
        model = Transaction
        fields = [
            "id", "receiver_account_number", "transaction_type", "amount", "status",
            "tracking_number", "receiver_account"
        ]
        read_only_fields = ["id", "status", "tracking_number", "receiver_account"]

    def validate(self, data):
        # Resolve receiver's account
        receiver_account = Account.objects.filter(account_number=data["receiver_account_number"]).first()
        if not receiver_account:
            raise serializers.ValidationError({"receiver_account_number": "Receiver account does not exist."})
        data["receiver_account"] = receiver_account
        return data
    


class TransactionPreviewSerializer(serializers.Serializer):
    sender_account_number = serializers.CharField(write_only=True)
    receiver_account_number = serializers.CharField(write_only=True)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)

    converted_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    conversion_rate = serializers.DecimalField(max_digits=10, decimal_places=6, read_only=True)
    sender_currency = serializers.CharField(read_only=True)
    receiver_currency = serializers.CharField(read_only=True)

    def validate(self, data):
        # Fetch sender's account
        sender_account = Account.objects.filter(account_number=data["sender_account_number"]).first()
        if not sender_account:
            raise serializers.ValidationError({"sender_account_number": "Sender account does not exist."})
        if sender_account.balance < data["amount"]:
            raise serializers.ValidationError({"amount": "Insufficient balance."})

        # Fetch receiver's account
        receiver_account = Account.objects.filter(account_number=data["receiver_account_number"]).first()
        if not receiver_account:
            raise serializers.ValidationError({"receiver_account_number": "Receiver account does not exist."})

        # Perform conversion
        converted_amount, conversion_rate = convert_currency(
            sender_account.currency, receiver_account.currency, data["amount"]
        )

        data["converted_amount"] = converted_amount
        data["conversion_rate"] = conversion_rate
        data["sender_currency"] = sender_account.currency
        data["receiver_currency"] = receiver_account.currency

        return data