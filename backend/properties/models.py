from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from cloudinary.models import CloudinaryField


class Amenity(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Amenities'
        ordering = ['name']

    def __str__(self):
        return self.name


class Property(models.Model):
    PROPERTY_TYPE_CHOICES = [
        ('Apartment', 'Apartment'),
        ('Villa', 'Villa'),
        ('Plot', 'Plot'),
        ('Commercial', 'Commercial'),
    ]

    LISTING_TYPE_CHOICES = [
        ('Sale', 'Sale'),
        ('Rent', 'Rent'),
    ]

    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Sold', 'Sold'),
        ('Rented', 'Rented'),
    ]

    # Basic Info
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES)
    listing_type = models.CharField(max_length=10, choices=LISTING_TYPE_CHOICES)

    # Pricing
    price = models.DecimalField(max_digits=12, decimal_places=2)

    # Location
    city = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    address = models.TextField()

    # Details
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    built_up_area = models.FloatField()

    # Media
    image1 = CloudinaryField('image', blank=True, null=True)
    image2 = CloudinaryField('image', blank=True, null=True)
    image3 = CloudinaryField('image', blank=True, null=True)
    image4 = CloudinaryField('image', blank=True, null=True)
    image5 = CloudinaryField('image', blank=True, null=True)

    # Amenities
    amenities = models.ManyToManyField(Amenity, blank=True, related_name='properties')

    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Available')
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # Relationship
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')

    class Meta:
        verbose_name_plural = 'Properties'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)



