from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth
from .models import User
from .serializers import UserSerializer
import re


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    return Response({'status': 'ok'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_or_login(request):
    token = request.data.get('token')
    
    if not token:
        return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        decoded_token = auth.verify_id_token(token)
        firebase_uid = decoded_token['uid']
        email = decoded_token.get('email')
        
        if not email:
            return Response({'error': 'Email not found in token'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user exists
        try:
            user = User.objects.get(firebase_uid=firebase_uid)
            serializer = UserSerializer(user)
            return Response({
                'user': serializer.data,
                'profileCompleted': True
            }, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            # New user - check if profile data provided
            name = request.data.get('name')
            phone = request.data.get('phone')
            role = request.data.get('role')
            
            if not all([name, phone, role]):
                return Response({
                    'user': {
                        'email': email,
                        'firebase_uid': firebase_uid
                    },
                    'profileCompleted': False
                }, status=status.HTTP_200_OK)
            
            # Validate phone
            if not re.match(r'^\+?[\d\s\-()]+$', phone):
                return Response({'error': 'Invalid phone format'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Validate role
            if role not in ['buyer', 'seller', 'agent']:
                return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create user
            user = User.objects.create(
                firebase_uid=firebase_uid,
                email=email,
                name=name,
                phone=phone,
                role=role
            )
            
            serializer = UserSerializer(user)
            return Response({
                'user': serializer.data,
                'profileCompleted': True
            }, status=status.HTTP_201_CREATED)
    
    except auth.InvalidIdTokenError:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
    except auth.ExpiredIdTokenError:
        return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
