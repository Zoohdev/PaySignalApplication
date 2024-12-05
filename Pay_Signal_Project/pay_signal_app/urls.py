from django.urls import path
from .views import (
    UserRegistrationView,
    VerifyEmailView,
    LoginView,
    ConfirmActionView,
    LogoutView,
    CookieTokenRefreshView,
    CreateAccountView,
    CreateTransactionView

    
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('confirm-action/', ConfirmActionView.as_view(), name='verify-confirmation-code'),
    path("token/refresh/", CookieTokenRefreshView.as_view(), name="token-refresh"),
    path('accounts/create/', CreateAccountView.as_view(), name='create-account'),
    path('transactions/create/', CreateTransactionView.as_view(), name='create-transaction'),
]
