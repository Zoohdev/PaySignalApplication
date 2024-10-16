from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import UserRegistrationForm
from django.contrib import messages

# Create your views here.

def home(request):
    return render(request, "home.html")


def register(request):
    if request.method == "POST":
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user) # Automatically log the user in after registration
            messages.success(request, 'Registration successful!')
            return redirect("home") # Redirect to home page
    else:
        form = UserRegistrationForm()
        
        
    return render(request, "register.html", {"form": form})