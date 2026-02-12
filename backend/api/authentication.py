from rest_framework import authentication, exceptions
from firebase_admin import auth
from .models import User

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        
        if not auth_header:
            return None
        
        try:
            token = auth_header.split(' ')[1]
            decoded_token = auth.verify_id_token(token)
            firebase_uid = decoded_token['uid']
            
            try:
                user = User.objects.get(firebase_uid=firebase_uid)
                return (user, None)
            except User.DoesNotExist:
                raise exceptions.AuthenticationFailed('User not found')
                
        except IndexError:
            raise exceptions.AuthenticationFailed('Invalid token format')
        except auth.InvalidIdTokenError:
            raise exceptions.AuthenticationFailed('Invalid token')
        except auth.ExpiredIdTokenError:
            raise exceptions.AuthenticationFailed('Token expired')
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))
