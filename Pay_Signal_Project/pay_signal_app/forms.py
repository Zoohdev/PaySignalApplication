from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User
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
