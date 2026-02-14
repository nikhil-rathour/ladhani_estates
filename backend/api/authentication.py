from rest_framework import authentication, exceptions
from firebase_admin import auth
import logging

from .models import User

logger = logging.getLogger(__name__)


class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')

        if not auth_header:
            return None

        try:
            parts = auth_header.split(' ')
            if len(parts) != 2 or parts[0].lower() != 'bearer':
                raise exceptions.AuthenticationFailed('Invalid authorization header')

            token = parts[1]
            decoded_token = auth.verify_id_token(token)
            firebase_uid = decoded_token['uid']

            try:
                user = User.objects.get(firebase_uid=firebase_uid)
                return (user, None)
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed('User not found')

        except auth.InvalidIdTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except auth.ExpiredIdTokenError:
            raise exceptions.AuthenticationFailed('Token expired')
        except exceptions.AuthenticationFailed:
            raise
        except Exception:
            logger.exception('Unexpected authentication failure')
            raise exceptions.AuthenticationFailed('Authentication failed')
