import firebase_admin
from firebase_admin import credentials
import os


def initialize_firebase():
    if not firebase_admin._apps:
        private_key = os.getenv("FIREBASE_PRIVATE_KEY")
        required_values = [
            os.getenv("FIREBASE_TYPE"),
            os.getenv("FIREBASE_PROJECT_ID"),
            os.getenv("FIREBASE_PRIVATE_KEY_ID"),
            private_key,
            os.getenv("FIREBASE_CLIENT_EMAIL"),
            os.getenv("FIREBASE_CLIENT_ID"),
            os.getenv("FIREBASE_AUTH_URI"),
            os.getenv("FIREBASE_TOKEN_URI"),
            os.getenv("FIREBASE_AUTH_PROVIDER_CERT_URL"),
            os.getenv("FIREBASE_CLIENT_CERT_URL"),
        ]

        # Allow app startup for commands/environments where Firebase auth is not configured.
        if any(value is None for value in required_values):
            return

        cred = credentials.Certificate({
            "type": os.getenv("FIREBASE_TYPE"),
            "project_id": os.getenv("FIREBASE_PROJECT_ID"),
            "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
            "private_key": private_key.replace('\\n', '\n'),
            "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
            "client_id": os.getenv("FIREBASE_CLIENT_ID"),
            "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
            "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
            "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_CERT_URL"),
            "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL")
        })
        firebase_admin.initialize_app(cred)
