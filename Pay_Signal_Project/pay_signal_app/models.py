# pay_signal_app/models.py

import uuid
import random
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.timezone import now
from datetime import timedelta
from django.core.exceptions import ValidationError
from decimal import Decimal




# Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        user = self.model(username=username, email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, email, password, **extra_fields)



class User(AbstractUser):
    """
    Custom user model extending AbstractUser to include additional fields.
    """
    firstname = models.CharField(max_length=50, null=True, blank=True)
    middlename = models.CharField(max_length=50, null=True, blank=True)
    lastname = models.CharField(max_length=50, null=True, blank=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    date_of_birth = models.DateField()
    country = models.CharField(max_length=50)
    is_verified_status = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    
    objects = UserManager()
    
    def __str__(self):
        return f"{self.username} - {self.country} - {self.currency} - Verified: {self.is_verified_status}"

    
class EmailVerificationToken(models.Model):
    token = models.CharField(max_length=255, unique=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='email_verification_tokens')
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"Token({self.token}) for {self.user.email}"
    
    
class Account(models.Model):
    ACCOUNT_TYPES = [
        ('SAVINGS', 'Savings'),
        ('CURRENT', 'Current'),
        ('WALLET', 'Wallet'),
    ]

    CURRENCY_CHOICES = [
        ('USD', 'US Dollar'),
        ('NGN', 'Nigerian Naira'),
        ('ZAR', 'South African Rand'),
        ('GBP', 'British Pound'),
    ]

    id = models.CharField(
        primary_key=True,
        max_length=20,
        unique=True,
        default=uuid.uuid4().hex[:20]  # 20-character unique identifier
    )
    user = models.ForeignKey(
        'User', on_delete=models.CASCADE, related_name="accounts"
    )
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPES)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal('0.00'))
    account_number = models.CharField(max_length=11, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """
        Generate an 11-digit account number based on user's UUID if not already set.
        Limit a user to a maximum of 5 accounts.
        """
        if not self.account_number:
            self.account_number = self.generate_account_number()
        
        # Enforce account limit per user
        if self.user.accounts.count() >= 5:
            raise ValueError("A user can only have up to 5 accounts.")
        
        super().save(*args, **kwargs)

    def generate_account_number(self) -> str:
        """
        Generate a unique 11-digit account number.
        This ensures uniqueness based on UUID and truncates to fit 11 digits.
        """
        while True:
            account_number = str(uuid.uuid4().int)[:11]
            if not Account.objects.filter(account_number=account_number).exists():
                return account_number

    def __str__(self):
        return f"{self.user.username} - {self.account_number} ({self.currency})"
    
    
    

class ConfirmationCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=8)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_valid(self):
        return now() <= self.expires_at
    



class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('TRANSFER', 'Transfer'),
        ('PAYMENT', 'Payment'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    ]

    id = models.CharField(primary_key=True, max_length=30, unique=True, default=uuid.uuid4)
    sender_account = models.ForeignKey(
        'Account', on_delete=models.CASCADE, related_name="sent_transactions"
    )
    receiver_account = models.ForeignKey(
        'Account', on_delete=models.CASCADE, related_name="received_transactions"
    )
    sender_name = models.CharField(max_length=255)
    receiver_name = models.CharField(max_length=255)
    receiver_email = models.EmailField()
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    tracking_number = models.CharField(max_length=50, unique=True, editable=False)
    time_initiated = models.DateTimeField(default=now)
    time_completed = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.tracking_number:
            user_id_segment = str(uuid.uuid4().int)[:30]  # Generate unique 30-digit identifier
            today = now().strftime('%Y%m%d')  # Format date as YYYYMMDD
            self.tracking_number = f"TXN-{today}-{user_id_segment}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.sender_name} -> {self.receiver_name}: {self.amount} {self.status}"






class ConversionRate(models.Model):
    base_currency = models.CharField(max_length=3)  # e.g., 'USD'
    target_currency = models.CharField(max_length=3)  # e.g., 'NGN'
    rate = models.DecimalField(max_digits=12, decimal_places=6)  # Higher precision for rates
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp of last update

    def __str__(self):
        return f"{self.base_currency} to {self.target_currency}: {self.rate}"
