from django.urls import path
from .views import UserRegistrationView
from .views import VerifyEmailView

urlpatterns = [
   path('register/', UserRegistrationView.as_view(), name='register'),
   path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
   
]
