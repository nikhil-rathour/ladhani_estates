from rest_framework import serializers
from .models import Amenity, Property
import os


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name', 'created_at']


class PropertySerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True, read_only=True)
    amenity_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        queryset=Amenity.objects.all(), 
        source='amenities', 
        write_only=True,
        required=False
    )
    image1 = serializers.SerializerMethodField()
    image2 = serializers.SerializerMethodField()
    image3 = serializers.SerializerMethodField()
    image4 = serializers.SerializerMethodField()
    image5 = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = [
            'id', 'title', 'slug', 'description', 'property_type', 'listing_type',
            'price', 'city', 'area', 'address', 'bedrooms', 'bathrooms',
            'built_up_area', 'image1', 'image2', 'image3', 'image4', 'image5',
            'amenities', 'amenity_ids', 'is_featured', 'is_active', 'created_at', 'created_by'
        ]
        read_only_fields = ['slug', 'created_at']

    def get_image1(self, obj):
        return self._get_cloudinary_url(obj.image1)
    
    def get_image2(self, obj):
        return self._get_cloudinary_url(obj.image2)
    
    def get_image3(self, obj):
        return self._get_cloudinary_url(obj.image3)
    
    def get_image4(self, obj):
        return self._get_cloudinary_url(obj.image4)
    
    def get_image5(self, obj):
        return self._get_cloudinary_url(obj.image5)
    
    def _get_cloudinary_url(self, image_field):
        if not image_field:
            return None
        cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
        return f"https://res.cloudinary.com/{cloud_name}/{image_field}"

    def create(self, validated_data):
        amenities = validated_data.pop('amenities', [])
        property_instance = Property.objects.create(**validated_data)
        property_instance.amenities.set(amenities)
        return property_instance

    def update(self, instance, validated_data):
        amenities = validated_data.pop('amenities', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if amenities is not None:
            instance.amenities.set(amenities)
        return instance
