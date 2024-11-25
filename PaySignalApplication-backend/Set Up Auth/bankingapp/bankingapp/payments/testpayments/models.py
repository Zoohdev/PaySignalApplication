from django.db import models

from django.contrib.auth.models import AbstractUser # extend user functionality
from django.db import models # define database models

# Custom User model 
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True) # unique email address for each user
    
    

class Transaction(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_transactions')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Change this to avoid clashes
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',  # Change this to avoid clashes
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )

    def __str__(self):
        return f"{self.sender} to {self.receiver} - {self.amount}"

class PrepaidPurchase(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    purchase_type = models.CharField(max_length=50)  #  Airtime, Electricity, Betting
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    purchase_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.purchase_type} - {self.amount}"
    


