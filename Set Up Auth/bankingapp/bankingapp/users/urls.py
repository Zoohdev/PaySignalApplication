from django.urls import path
from . import views  # Ensure you import your views

urlpatterns = [
       path('register/', views.register, name='register'),  # User registration
    path('login/', views.login_view, name='login'),  # User login
    path('logout/', views.logout_view, name='logout'),  # User logout
    path('profile/', views.profile, name='profile'),  # User profile page
    # Add more user-related views from frontend screens
]
