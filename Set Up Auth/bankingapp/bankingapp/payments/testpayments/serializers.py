# convert model instances into JSON
from rest_framework import serializers
from .models import Transaction, PrepaidPurchase, CustomUser

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class PrepaidPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrepaidPurchase
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email']
