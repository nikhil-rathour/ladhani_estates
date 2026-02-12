from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firebase_uid', 'email', 'name', 'phone', 'role', 'created_at', 'updated_at']
        read_only_fields = ['id', 'firebase_uid', 'email', 'created_at', 'updated_at']
