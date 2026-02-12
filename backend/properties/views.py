from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Amenity, Property
from .serializers import AmenitySerializer, PropertySerializer
from api.authentication import FirebaseAuthentication


class AmenityViewSet(viewsets.ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'property_type', 'listing_type', 'is_featured', 'is_active']
    search_fields = ['title', 'city', 'area']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']
    permission_classes = [AllowAny]
    authentication_classes = []

    def retrieve(self, request, *args, **kwargs):
        # Apply authentication only for retrieve action
        self.authentication_classes = [FirebaseAuthentication]
        self.permission_classes = []
        return super().retrieve(request, *args, **kwargs)
