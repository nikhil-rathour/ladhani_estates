import firebase_admin
from firebase_admin import credentials
import os


def _credential_payload():
    private_key = os.getenv("FIREBASE_PRIVATE_KEY", "")
    if private_key:
        private_key = private_key.replace("\\n", "\n")

    return {
        "type": os.getenv("FIREBASE_TYPE", "service_account"),
        "project_id": os.getenv("FIREBASE_PROJECT_ID"),
        "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
        "private_key": private_key,
        "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
        "client_id": os.getenv("FIREBASE_CLIENT_ID"),
        "auth_uri": os.getenv("FIREBASE_AUTH_URI", "https://accounts.google.com/o/oauth2/auth"),
        "token_uri": os.getenv("FIREBASE_TOKEN_URI", "https://oauth2.googleapis.com/token"),
        "auth_provider_x509_cert_url": os.getenv(
            "FIREBASE_AUTH_PROVIDER_CERT_URL",
            "https://www.googleapis.com/oauth2/v1/certs",
        ),
        "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL"),
    }


def initialize_firebase():
    if firebase_admin._apps:
        return firebase_admin.get_app()

    credential_data = _credential_payload()
    required_keys = [
        "project_id",
        "private_key_id",
        "private_key",
        "client_email",
        "client_id",
        "client_x509_cert_url",
    ]
    missing_keys = [key for key in required_keys if not credential_data.get(key)]
    if missing_keys:
        raise ValueError(
            f"Missing Firebase credentials: {', '.join(sorted(missing_keys))}"
        )

    cred = credentials.Certificate(credential_data)
    return firebase_admin.initialize_app(cred)
