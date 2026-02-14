from firebase_admin import auth
from rest_framework import authentication, exceptions

from root.firebase import initialize_firebase

from .models import User


class FirebaseAuthentication(authentication.BaseAuthentication):
    keyword = "Bearer"

    def authenticate(self, request):
        raw_header = authentication.get_authorization_header(request).decode("utf-8")
        if not raw_header:
            return None

        header_parts = raw_header.split()
        if len(header_parts) != 2 or header_parts[0].lower() != self.keyword.lower():
            raise exceptions.AuthenticationFailed("Invalid authorization header.")

        token = header_parts[1].strip()
        if not token:
            raise exceptions.AuthenticationFailed("Missing authentication token.")

        try:
            initialize_firebase()
            decoded_token = auth.verify_id_token(token)
            firebase_uid = decoded_token.get("uid")
            if not firebase_uid:
                raise exceptions.AuthenticationFailed("Invalid token payload.")

            user = User.objects.filter(firebase_uid=firebase_uid).first()
            if user is None:
                raise exceptions.AuthenticationFailed("User not found.")

            return (user, None)
        except auth.InvalidIdTokenError as exc:
            raise exceptions.AuthenticationFailed("Invalid token.") from exc
        except auth.ExpiredIdTokenError as exc:
            raise exceptions.AuthenticationFailed("Token expired.") from exc
        except ValueError as exc:
            raise exceptions.AuthenticationFailed("Firebase credentials are not configured.") from exc
        except Exception as exc:
            raise exceptions.AuthenticationFailed("Authentication failed.") from exc
