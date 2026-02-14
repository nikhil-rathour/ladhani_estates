import re

from firebase_admin import auth
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle

from root.firebase import initialize_firebase

from .models import User
from .serializers import UserSerializer

PHONE_PATTERN = re.compile(r"^\+?[\d\s\-()]+$")
VALID_ROLES = {"buyer", "seller", "agent"}


@api_view(["POST"])
@permission_classes([AllowAny])
@throttle_classes([ScopedRateThrottle])
def register_or_login(request):
    token = request.data.get("token")
    if not token:
        return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        initialize_firebase()
        decoded_token = auth.verify_id_token(token)
        firebase_uid = decoded_token.get("uid")
        email = decoded_token.get("email")

        if not firebase_uid or not email:
            return Response(
                {"error": "Invalid token payload"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.filter(firebase_uid=firebase_uid).first()
        if user:
            return Response(
                {"user": UserSerializer(user).data, "profileCompleted": True},
                status=status.HTTP_200_OK,
            )

        name = request.data.get("name")
        phone = request.data.get("phone")
        role = request.data.get("role")

        if not all([name, phone, role]):
            return Response(
                {
                    "user": {"email": email, "firebase_uid": firebase_uid},
                    "profileCompleted": False,
                },
                status=status.HTTP_200_OK,
            )

        if not PHONE_PATTERN.match(phone):
            return Response(
                {"error": "Invalid phone format"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if role not in VALID_ROLES:
            return Response({"error": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            firebase_uid=firebase_uid,
            email=email,
            name=name,
            phone=phone,
            role=role,
        )
        return Response(
            {"user": UserSerializer(user).data, "profileCompleted": True},
            status=status.HTTP_201_CREATED,
        )
    except auth.InvalidIdTokenError:
        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
    except auth.ExpiredIdTokenError:
        return Response({"error": "Token expired"}, status=status.HTTP_401_UNAUTHORIZED)
    except ValueError:
        return Response(
            {"error": "Authentication service is not configured"},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
    except Exception:
        return Response(
            {"error": "Unable to process authentication request"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


register_or_login.cls.throttle_scope = "auth"
