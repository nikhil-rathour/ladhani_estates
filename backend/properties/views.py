from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.exceptions import ValidationError

from .models import Amenity, Property
from .serializers import AmenitySerializer, PropertySerializer


class AmenityViewSet(viewsets.ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name"]
    ordering_fields = ["name", "created_at"]
    ordering = ["name"]


class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["city", "property_type", "listing_type", "is_featured", "is_active", "status"]
    search_fields = ["title", "city", "area", "description"]
    ordering_fields = ["price", "created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = Property.objects.select_related("created_by").prefetch_related("amenities")
        if self.action in {"list", "retrieve"}:
            queryset = queryset.filter(is_active=True)
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self._resolve_django_user())

    def _resolve_django_user(self):
        request_user = self.request.user
        django_user_model = get_user_model()

        if request_user is None:
            raise ValidationError("Authentication is required.")

        if isinstance(request_user, django_user_model):
            return request_user

        email = getattr(request_user, "email", "")
        if not email:
            raise ValidationError("Authenticated user does not have an email address.")

        existing_user = django_user_model.objects.filter(email=email).first()
        if existing_user:
            return existing_user

        username_base = email.split("@")[0][:140] or "user"
        username = username_base
        index = 1
        while django_user_model.objects.filter(username=username).exists():
            suffix = f"-{index}"
            username = f"{username_base[:150 - len(suffix)]}{suffix}"
            index += 1

        return django_user_model.objects.create(username=username, email=email)
