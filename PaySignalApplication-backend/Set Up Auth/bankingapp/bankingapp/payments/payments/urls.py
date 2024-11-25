
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionViewSet, PrepaidPurchaseViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
     path('api/', include('payments.urls')),
]

router = DefaultRouter()
router.register(r'transactions', TransactionViewSet)
router.register(r'purchases', PrepaidPurchaseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns += [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


