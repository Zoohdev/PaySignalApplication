"""
URL configuration for Pay_Signal_Project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from pay_signal_app import views 
from django.contrib.auth import views as auth_views






# Define URL patterns for the app
urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('', views.home, name='home'),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('resend-verification/<int:user_id>/', views.resend_verification_email, name='resend_verification_email'),
    path('create-account/', views.create_account, name='create_account'),
    path('account/<int:account_id>/transfer/', views.transfer_funds, name='transfer_funds'),
    path('accounts/', views.account_list, name='account_list'),
    path('accounts/<int:account_id>/transactions/', views.transaction_list, name='transaction_list'),
    path('receipt/<str:transaction_id>/', views.transaction_receipt, name='transaction_receipt'),
    path('account/<int:account_id>/fund/', views.fund_account, name='fund_account'),
    path('account/<int:account_id>/', views.account_detail, name='account_detail'),
]