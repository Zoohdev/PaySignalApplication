from django.test import TestCase

# Create your tests here.

from django.test import TestCase
from django.urls import reverse
from django.utils.timezone import now, timedelta
from .models import EmailVerificationToken, User

class VerifyEmailViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email="testuser@example.com", password="password123")
        self.valid_token = EmailVerificationToken.objects.create(user=self.user, created_at=now())
        self.expired_token = EmailVerificationToken.objects.create(
            user=self.user, created_at=now() - timedelta(minutes=11)
        )
        self.reused_token = EmailVerificationToken.objects.create(user=self.user, is_used=True)

    def test_verify_email_with_valid_token(self):
        response = self.client.get(reverse('verify_email') + f"?token={self.valid_token.token}")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Email verified successfully!", response.data["message"])
        self.valid_token.refresh_from_db()
        self.assertTrue(self.valid_token.is_used)

    def test_verify_email_with_expired_token(self):
        response = self.client.get(reverse('verify_email') + f"?token={self.expired_token.token}")
        self.assertEqual(response.status_code, 400)
        self.assertIn("Token has expired.", response.data["error"])

    def test_verify_email_with_reused_token(self):
        response = self.client.get(reverse('verify_email') + f"?token={self.reused_token.token}")
        self.assertEqual(response.status_code, 400)
        self.assertIn("Token has already been used.", response.data["error"])

    def test_verify_email_with_invalid_token(self):
        response = self.client.get(reverse('verify_email') + "?token=invalidtoken123")
        self.assertEqual(response.status_code, 400)
        self.assertIn("Invalid or expired token.", response.data["error"])
