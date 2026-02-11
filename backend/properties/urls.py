from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AmenityViewSet, PropertyViewSet

router = DefaultRouter()
router.register(r'amenities', AmenityViewSet, basename='amenity')
router.register(r'properties', PropertyViewSet, basename='property')

urlpatterns = [
    path('', include(router.urls)),
]
