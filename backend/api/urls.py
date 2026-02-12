from django.urls import path
from . import views

urlpatterns = [
    path('auth/register-or-login/', views.register_or_login, name='register_or_login'),
]
