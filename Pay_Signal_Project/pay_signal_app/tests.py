from django.test import TestCase
from django.utils.timezone import now, timedelta
from .models import EmailVerificationToken, User
from django.urls import reverse

class VerifyEmailViewTest(TestCase):
    def setUp(self):
        """
        Set up test data for email verification.
        """
        self.user = User.objects.create_user(
            username='testuser',
            email='tes555t@example.com',
            password='password123',
            is_verified_status=False,  # Ensure the field exists
            phone_number='56534567890',
            date_of_birth='2000-01-01',
            country='TestCountry'
        )
        # Generate tokens with updated expiration time
        self.valid_token = EmailVerificationToken.objects.create(user=self.user, created_at=now())
        
        # Token expired after 30 minutes
        self.expired_token = EmailVerificationToken.objects.create(
            user=self.user, created_at=now() - timedelta(minutes=31)  # Token expired after 30 minutes
        )
        self.reused_token = EmailVerificationToken.objects.create(user=self.user, is_used=True)

    def test_verify_email_with_valid_token(self):
        """
        Test email verification with a valid token.
        """
        response = self.client.get(reverse('verify_email') + f"?token={self.valid_token.token}")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Email verified successfully!", response.json()["message"])

        # Ensure token is marked as used
        self.valid_token.refresh_from_db()
        self.assertTrue(self.valid_token.is_used)

        # Ensure user is marked as verified
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_verified_status)

    def test_verify_email_with_expired_token(self):
        """
        Test email verification with an expired token.
        """
        response = self.client.get(reverse('verify_email') + f"?token={self.expired_token.token}")
        self.assertEqual(response.status_code, 400)
        self.assertIn("Token has expired.", response.json()["error"])

        # Ensure token is not marked as used
        self.expired_token.refresh_from_db()
        self.assertFalse(self.expired_token.is_used)

        # Ensure user is not marked as verified
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_verified_status)

    def test_verify_email_with_reused_token(self):
        """
        Test email verification with a token that has already been used.
        """
        response = self.client.get(reverse('verify_email') + f"?token={self.reused_token.token}")
        self.assertEqual(response.status_code, 400)
        self.assertIn("Token has already been used.", response.json()["error"])

        # Ensure user is not re-verified
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_verified_status)

    def test_verify_email_with_invalid_token(self):
        """
        Test email verification with an invalid token.
        """
        response = self.client.get(reverse('verify_email') + "?token=invalidtoken123")
        self.assertEqual(response.status_code, 400)
        self.assertIn("Invalid token.", response.json()["error"])  # Adjusted message

        # Ensure user is not marked as verified
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_verified_status)

    def test_verify_email_without_token(self):
        """
        Test email verification without providing a token.
        """
        response = self.client.get(reverse('verify_email'))
        self.assertEqual(response.status_code, 400)
        self.assertIn("Token is required.", response.json()["error"])

        # Ensure user is not marked as verified
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_verified_status)
