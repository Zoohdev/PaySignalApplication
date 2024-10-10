from django.contrib import admin

# Register your models here.

# pay_signal_app/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your custom user model
admin.site.register(User, UserAdmin)
