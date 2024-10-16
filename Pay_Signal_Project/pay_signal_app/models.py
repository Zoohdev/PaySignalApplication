from django.contrib.auth.models import AbstractUser
from django.db import models

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
    firstname = models.CharField(max_length=50, default="Null")
    middlename = models.CharField(max_length=50, default="Null", blank=True)
    lastname = models.CharField(max_length=50, default="Null")
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    date_of_birth = models.DateField()
    country = models.CharField(max_length=50)
    currency = models.CharField(max_length=50)
    is_verified_status = models.BooleanField(default=False)
    
    def __str__(self):
        """
        Returns a string representation of the user, including their username, country, currency and verified status.
        """
        
        return f"{self.username} is from {self.country} and with a {self.currency} account that is verified: {self.is_verified_status}"
    
    
    
    