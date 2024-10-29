from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, Account, Transaction
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import datetime


class UserRegistrationForm(UserCreationForm):
    """
    Form for registering a new user account.

    Validates that the entered password is entered correctly and
    that the date of birth is not in the future.

    :param username: The desired username for the new user.
    :param email: The desired email address for the new user.
    :param phone_number: The desired phone number for the new user.
    :param date_of_birth: The desired date of birth for the new user.
    :param country: The desired country for the new user.
    :param currency: The desired currency for the new user.
    :return: A valid User object if the form is valid, otherwise None.
    """
    firstname = forms.CharField(
        required=True,
        max_length=30,
        widget=forms.TextInput(attrs={'placeholder': 'Enter your first name'})
        
    )
    middlename = forms.CharField(
        required=False,
        max_length=30,
        widget=forms.TextInput(attrs={'placeholder': 'Enter your middle name'})
        
    )
    lastname = forms.CharField(
        required=True,
        max_length=30,
        widget=forms.TextInput(attrs={'placeholder': 'Enter your last name'})
    )
    username = forms.CharField(
        max_length=50,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'Enter a unique username.'})
        
    )
    email = forms.EmailField(
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'Enter a valid email address'})
        
    )
    phone_number = forms.CharField(
        max_length=15,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'Enter your phone number'})
        
    )
    date_of_birth = forms.DateField(
        required=True,
        widget=forms.SelectDateWidget(
            years=range(1900, datetime.now().year + 1),
            attrs={'placeholder': 'Select your Date of Birth'}
        )
    )
        
    country = forms.CharField(
        max_length=50,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'Enter your country'})
         # Help text added
    )
    currency = forms.CharField(
        max_length=3,
        required=True,
        widget=forms.TextInput(attrs={'placeholder': 'Enter your currency (e.g. USD)'})
        
    )

    class Meta:
        """
        Meta class for UserRegistrationForm.

        This class is used to define the fields of the form and the model
        associated with the form.

        :param model: The model associated with the form.
        :param fields: The fields of the form.
        """
        model = User
        fields = (
            "firstname", 
            "middlename",
            "lastname",
            "username",
            "email",
            "phone_number",
            "date_of_birth",
            "country",
            "currency",
            "password1",
            "password2",
        )
        
        
        
    def clean_date_of_birth(self):
        dob = self.cleaned_data.get('date_of_birth')
        if dob is None:
            raise ValidationError('Date of birth is required.')
        today = timezone.now().date()
        try:
            age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        except TypeError:
            raise ValidationError('Date of birth must be a valid date.')
        if age < 18:
            raise ValidationError('You must be at least 18 years old to register.')
        return dob



class AccountForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ['account_type', 'currency']
        
        
class TransferFundsForm(forms.Form):
    recipient_account = forms.ModelChoiceField(queryset=Account.objects.all(), label="Recipient Account")
    amount = forms.DecimalField(max_digits=10, decimal_places=2, label="Amount to Transfer")

    def __init__(self, *args, **kwargs):
        self.sender_account = kwargs.pop('sender_account', None)  # Store sender_account as an instance attribute
        super().__init__(*args, **kwargs)
        
        if self.sender_account:
            # Exclude the sender account from recipient choices
            self.fields['recipient_account'].queryset = Account.objects.exclude(id=self.sender_account.id)

    def clean_amount(self):
        amount = self.cleaned_data.get('amount')
        
        # Validate that the amount is positive
        if amount <= 0:
            raise forms.ValidationError("Transfer amount must be greater than zero.")
        
        # Check if the sender has enough balance
        if self.sender_account and self.sender_account.balance < amount:
            raise forms.ValidationError("Insufficient balance.")
        
        return amount
        
        
    def clean_recipient_account_number(self):
        account_number = self.cleaned_data.get('recipient_account_number')
        try:
            recipient_account = Account.objects.get(account_number=account_number)
            if recipient_account == self.sender_account:
                raise forms.ValidationError("You cannot transfer funds to your own account.")
            return recipient_account
        except Account.DoesNotExist:
            raise forms.ValidationError("Recipient account not found.")
        
        
    class Meta:
        model = Transaction
        fields = ['recipient_name', 'amount', 'currency', 'user_phone', 'user_location', 'recipient_account_id']

class DepositForm(forms.Form):
    amount = forms.DecimalField(max_digits=15, decimal_places=2, min_value=0.01, label="Deposit Amount")