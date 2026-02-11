from django.contrib import admin
from .models import Amenity, Property


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['title', 'property_type', 'listing_type', 'price', 'city', 'is_featured', 'is_active', 'created_at']
    list_filter = ['property_type', 'listing_type', 'city', 'is_featured', 'is_active']
    search_fields = ['title', 'city', 'area']
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ['amenities']
    readonly_fields = ['created_at']
