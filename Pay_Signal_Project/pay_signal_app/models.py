# pay_signal_app/models.py

import uuid
import random
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError

# Choices for currency and account types
CURRENCY_CHOICES = [
    ('USD', 'US Dollar'),
    ('EUR', 'Euro'),
    ('GBP', 'British Pound'),
    # Add more currencies as needed
]

ACCOUNT_TYPES = [
    ('savings', 'Savings Account'),
    ('checking', 'Checking Account'),
    ('investment', 'Investment Account'),
]


TRANSACTION_TYPES = [
    ('Deposit', 'Deposit'),
    ('Withdrawal', 'Withdrawal'),
    ('Transfer', 'Transfer')
]

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
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')
    is_verified_status = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    def __str__(self):
        return f"{self.username} - {self.country} - {self.currency} - Verified: {self.is_verified_status}"


class Account(models.Model):
    """
    Model representing a user's bank account.
    Each user can have up to 5 accounts, with unique account numbers.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="accounts")
    account_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    account_number = models.CharField(max_length=11, unique=True, editable=False)
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')
    date_opened = models.DateTimeField(default=timezone.now)
    account_type = models.CharField(max_length=15, choices=ACCOUNT_TYPES, default='savings')

    def save(self, *args, **kwargs):
        # Enforce a maximum of 5 accounts per user
        if self.user.accounts.count() >= 5:
            raise ValidationError("User cannot have more than 5 accounts.")

        # Generate a unique 11-digit account number from the account_id
        if not self.account_number:
            self.account_number = str(self.account_id.int)[:11]  # Get first 11 digits of the UUID

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Account {self.account_number} - {self.user.username}"


class Transaction(models.Model):
    """
    Model for transactions on an account, either deposits or withdrawals.
    """
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="transactions")
    transaction_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    date_of_transaction = models.DateTimeField(default=timezone.now)
    description = models.TextField(blank=True, null=True)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    recipient_name = models.CharField(max_length=255)
    recipient_account_number = models.CharField(max_length=11)
    time_sent = models.DateTimeField(auto_now_add=True)
    time_received = models.DateTimeField(null=True, blank=True)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')
    user_phone = models.CharField(max_length=15)
    user_location = models.CharField(max_length=255)
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    tracking_number = models.CharField(max_length=15, unique=True, editable=False)

    def save(self, *args, **kwargs):
        # Validate amount
        if self.amount <= 0:
            raise ValidationError("Transaction amount must be greater than zero.")

        # Check for sufficient balance on withdrawals
        if self.transaction_type == 'withdrawal' and self.amount > self.account.balance:
            raise ValidationError("Insufficient balance for this transaction.")

        # Set unique tracking_number if not set
        if not self.tracking_number:
            self.tracking_number = f"{self.account.account_number}{random.randint(100000, 999999)}"

        # Adjust account balance based on transaction type
        if self.transaction_type == 'deposit':
            self.account.balance += self.amount
        elif self.transaction_type == 'withdrawal':
            self.account.balance -= self.amount

        # Save the updated balance and transaction
        self.account.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Transaction {self.transaction_id} - {self.amount} {self.currency}"
