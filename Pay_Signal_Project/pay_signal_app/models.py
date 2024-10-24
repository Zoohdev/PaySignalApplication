import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
import random



# Create your models here.

class User(AbstractUser):
    """
    Custom user model extending AbstractUser to include additional fields:
    - username: A unique username.
    - email: A unique email address.
    - phone_number: A unique phone number.
    - date_of_birth: User's date of birth.
    - country: The user's country.
    - currency: The currency the user prefers for transactions.
    - is_verified_status: A boolean indicating if the user is verified.
    """
    firstname = models.CharField(max_length=50, null = True, blank=True)
    middlename = models.CharField(max_length=50, null = True, blank=True)
    lastname = models.CharField(max_length=50, null = True, blank=True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    date_of_birth = models.DateField()
    country = models.CharField(max_length=50)
    currency = models.CharField(max_length=50)
    is_verified_status = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True) # A unique identifier for the user.
    
    def __str__(self):
        """
        Returns a string representation of the user, including their username, country, currency and verified status.
        """
        
        return f"{self.username} is from {self.country} and with a {self.currency} account that is verified: {self.is_verified_status}"
    
    
    
# Get the user model for referencing users
User = get_user_model()

CURRENCY_CHOICES = [
    ('USD', 'US Dollar'),
    ('EUR', 'Euro'),
    ('GBP', 'British Pound'),
    # Add more currencies as needed
]

class Account(models.Model):
    ACCOUNT_TYPES = [
        ('savings', 'Savings Account'),
        ('checking', 'Checking Account'),
        ('investment', 'Investment Account'),
    ]

    # Foreign key to tie accounts to users (with a limit of 5 accounts per user)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="accounts")
    account_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    account_number = models.CharField(max_length=11, unique=True, editable=False)  # New field for account number
    balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')  # Add more currency options if needed
    date_opened = models.DateTimeField(default=timezone.now)
    account_type = models.CharField(max_length=15, choices=ACCOUNT_TYPES, default='savings')

    # Override save method to enforce account limit
    def save(self, *args, **kwargs):
        # Limit to 5 accounts per user
        if self.user.accounts.count() >= 5:
            raise ValueError('User cannot have more than 5 accounts.')

        # Generate a unique 11-digit account number from the account_id
        if not self.account_number:
            self.account_number = str(self.account_id.int)[:11]  # Get first 11 digits of the UUID's integer representation

        super().save(*args, **kwargs)


    def __str__(self):
        return f"Account {self.account_id} for {self.user.username}"

class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="transactions")
    transaction_id = models.CharField(max_length=15, unique=True, editable=False)
    date_of_transaction = models.DateTimeField(default=timezone.now)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    recipient_name = models.CharField(max_length=255)
    recipient_account_number = models.CharField(max_length=11)  # Changed field name for clarity
    time_sent = models.DateTimeField(auto_now_add=True)
    time_received = models.DateTimeField(null=True, blank=True)
    currency = models.CharField(max_length=3, choices=CURRENCY_CHOICES, default='USD')
    user_phone = models.CharField(max_length=15)
    user_location = models.CharField(max_length=255)
    transaction_type = models.CharField(max_length=10)  # e.g., "Deposit", "Withdraw"
    tracking_number = models.CharField(max_length=15, unique=True)
    
    # Generate a unique 15-digit transaction ID based on the account ID
    def save(self, *args, **kwargs):
        # Ensure sufficient balance before saving the transaction
        if self.amount <= 0:
            raise ValueError('Transaction amount must be greater than zero.')
        if self.amount > self.account.balance:
            raise ValueError('Insufficient balance for this transaction.')

        # Generate transaction_id if not already set
        if not self.transaction_id:
            self.transaction_id = str(self.account.account_number) + str(random.randint(10000, 99999))

        # Deduct the amount from the account balance
        self.account.balance -= self.amount
        self.account.save()  # Save the updated balance

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Transaction {self.transaction_id} - {self.amount} {self.currency}"