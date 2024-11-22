from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from pay_signal_app.models import User, ConfirmationCode
from datetime import timedelta
from django.utils.timezone import now

class AuthTests(APITestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword",
            email="test@example.com",
            is_verified_status=True
        )
        self.login_url = reverse("login")  # Adjust to your URL name
        self.confirm_action_url = reverse("confirm-action")  # Adjust to your URL name

    def test_login_success(self):
        data = {
            "username": "testuser",
            "password": "testpassword"
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("message", response.data)
        self.assertTrue(response.cookies.get("access_token"))
        self.assertTrue(response.cookies.get("refresh_token"))

    def test_login_invalid_password(self):
        data = {
            "username": "testuser",
            "password": "wrongpassword"
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("error", response.data)

    def test_confirm_action(self):
        # Create a confirmation code
        confirmation_code = ConfirmationCode.objects.create(
            user=self.user,
            code="12345678",
            expires_at=now() + timedelta(minutes=30)
        )
        data = {"code": "12345678"}
        response = self.client.post(self.confirm_action_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access_token", response.data)
        self.assertIn("refresh_token", response.data)

    def test_confirm_action_invalid_code(self):
        data = {"code": "wrongcode"}
        response = self.client.post(self.confirm_action_url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("error", response.data)
