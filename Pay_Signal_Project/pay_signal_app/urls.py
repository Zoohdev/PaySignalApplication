from django.urls import path
from .views import UserRegistrationView
from .views import VerifyEmailView, LoginView, ConfirmActionView, create_account, currency_converter, make_transaction

urlpatterns = [
   path('register/', UserRegistrationView.as_view(), name='register'),
   path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
   path('login/', LoginView.as_view(), name='login'),
   path('confirm-action/', ConfirmActionView.as_view(), name='confirm_action'),
   path('create-account/', create_account, name='create_account'),
   path('convert-currency/', currency_converter, name='currency_converter'),
   path('make-transaction/', make_transaction, name='make_transaction'),
   
]
