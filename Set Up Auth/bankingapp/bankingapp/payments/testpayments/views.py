from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Transaction, PrepaidPurchase
from .serializers import TransactionSerializer, PrepaidPurchaseSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

class PrepaidPurchaseViewSet(viewsets.ModelViewSet):
    queryset = PrepaidPurchase.objects.all()
    serializer_class = PrepaidPurchaseSerializer
    permission_classes = [IsAuthenticated]

