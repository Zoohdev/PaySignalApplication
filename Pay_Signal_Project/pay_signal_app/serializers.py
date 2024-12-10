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
    """
    Serializer for the Account model.
    """
    class Meta:
        model = Account
        fields = [
            'id', 'user', 'account_type', 'currency', 'balance', 
            'account_number', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'account_number', 'created_at', 'updated_at']

    def create(self, validated_data):
        """
        Automatically associate the account with the authenticated user.
        """
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

        
        
    


class TransactionPreviewSerializer(serializers.Serializer):
    """
    Serializer for transaction previews.
    Validates inputs for previewing transactions.
    """
    receiver_account_number = serializers.CharField(max_length=20)
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)

    def validate(self, data):
        receiver_account_number = data.get('receiver_account_number')
        amount = data.get('amount')

        # Ensure a positive transaction amount
        if amount <= 0:
            raise serializers.ValidationError("Transaction amount must be greater than zero.")

        # Validate receiver account
        try:
            receiver_account = Account.objects.get(account_number=receiver_account_number)
        except Account.DoesNotExist:
            raise serializers.ValidationError({"receiver_account_number": "Receiver account not found."})

        # Attach receiver account for further processing
        data['receiver_account'] = receiver_account

        return data


class TransactionSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a transaction.
    """
    confirm = serializers.BooleanField(default=False, write_only=True)  # Add confirm explicitly
    receiver_account_number = serializers.CharField(write_only=True)  # Accept receiver account number

    class Meta:
        model = Transaction
        fields = ['receiver_account_number', 'amount', 'confirm']  # Use receiver_account_number
        
        read_only_fields = ['id', 'status', 'created_at']


    def validate(self, data):
        sender_account = self.context.get('sender_account')  # Extract sender_account from context
        if not sender_account:
            raise serializers.ValidationError({"sender_account": "Sender account is missing or invalid."})

        receiver_account_number = data.get('receiver_account_number')
        try:
            receiver_account = Account.objects.get(account_number=receiver_account_number)
        except Account.DoesNotExist:
            raise serializers.ValidationError({"receiver_account_number": "Receiver account not found."})

        # Attach sender and receiver accounts to validated data
        data['sender_account'] = sender_account
        data['receiver_account'] = receiver_account
        return data

    def create(self, validated_data):
        # Remove fields not part of the Transaction model
        validated_data.pop('receiver_account_number', None)
        converted_amount = validated_data.pop('converted_amount', None)
        charges = validated_data.pop('charges', None)
        validated_data.pop('confirm', None)

        # Create the Transaction instance
        transaction = Transaction.objects.create(
            **validated_data,
            converted_amount=converted_amount,
            charges=charges
        )
        return transaction
