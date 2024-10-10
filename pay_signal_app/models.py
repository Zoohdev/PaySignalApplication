from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.

class CustomUser(AbstractUser):
    """
    CustomUser is a model that extends the basic Django User model by adding country, currency, and verification status fields.

    The country field is a character field that stores the user's country of origin.
    The currency field is a character field that stores the currency used by the user.
    The is_verified field is a boolean field that indicates whether the user has been verified or not.

    The __str__ method returns a string representation of the user, which includes the user's name, country, currency, and verification status.
    """
    country = models.CharField(max_length=100)
    currency = models.CharField(max_length=10)
    is_verified = models.BooleanField(default=False)
    
    
    def __str__(self):
        """
        Return a string representation of the user, which includes the user's name, country, currency, and verification status.

        :return: A string representation of the user.
        """
        return f"{self.username} is from {self.country} and owns {self.currency} with a verification status of {self.is_verified}"
