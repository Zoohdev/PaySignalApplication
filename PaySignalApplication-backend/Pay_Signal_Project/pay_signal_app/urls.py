from django.urls import path
from .views import UserRegistrationView
from .views import (
    UserRegistrationView,
    VerifyEmailView,
    LoginView,
    ConfirmActionView,
    LogoutView,
    CookieTokenRefreshView
    
)

urlpatterns = [
   path('register/', UserRegistrationView.as_view(), name='register'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('confirm-action/', ConfirmActionView.as_view(), name='verify-confirmation-code'),
     path("token/refresh/", CookieTokenRefreshView.as_view(), name="token-refresh"),
]
