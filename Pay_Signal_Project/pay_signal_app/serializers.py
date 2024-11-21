from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ConfirmationCode, Account, Transaction


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

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['account_number', 'account_type', 'currency', 'balance', 'date_opened']
        read_only_fields = ['account_number', 'date_opened', 'balance']  # account_number is auto-generated


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [
            'transaction_id', 'account', 'amount', 'recipient_name', 
            'recipient_account_number', 'transaction_type', 'currency', 
            'user_phone', 'user_location', 'time_sent', 'time_received', 
            'description', 'tracking_number'
        ]
        read_only_fields = ['transaction_id', 'time_sent', 'time_received', 'tracking_number']

    def validate(self, data):
        # Custom validation for transaction type
        if data['amount'] <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return data

    def create(self, validated_data):
        transaction = super().create(validated_data)
        # Adjust account balance
        account = transaction.account
        if transaction.transaction_type == 'deposit':
            account.balance += transaction.amount
        elif transaction.transaction_type == 'withdrawal':
            if account.balance < transaction.amount:
                raise serializers.ValidationError("Insufficient balance.")
            account.balance -= transaction.amount
        account.save()
        return transaction
    

    
    
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
        if not confirmation_code.is_valid():
            raise serializers.ValidationError("Confirmation code has expired.")

        return value
    
class CurrencyConversionSerializer(serializers.Serializer):
    from_currency = serializers.CharField(max_length=3)
    to_currency = serializers.CharField(max_length=3)
    amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    

        
        
class AccountCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['account_type', 'currency']
        read_only_fields = ['account_number', 'date_opened', 'balance']       
