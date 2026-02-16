"""
Django settings for root project.
"""

import os
from pathlib import Path
from urllib.parse import parse_qsl, urlparse

import cloudinary
from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

load_dotenv()


BASE_DIR = Path(__file__).resolve().parent.parent


def get_env_bool(name, default=False):
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {'1', 'true', 'yes', 'on'}


def get_env_list(name, default=None):
    value = os.getenv(name)
    if not value:
        return list(default or [])
    return [item.strip() for item in value.split(',') if item.strip()]


DEFAULT_SECRET_KEY = 'django-insecure-dev-only-change-me'
SECRET_KEY = os.getenv('SECRET_KEY', DEFAULT_SECRET_KEY)
IS_VERCEL = bool(os.getenv('VERCEL'))
DEBUG = get_env_bool('DEBUG', not IS_VERCEL)

if not DEBUG and SECRET_KEY == DEFAULT_SECRET_KEY:
    raise ImproperlyConfigured('SECRET_KEY must be configured when DEBUG=False.')

default_allowed_hosts = ['localhost', '127.0.0.1', '.vercel.app']
vercel_url = os.getenv('VERCEL_URL')
if vercel_url:
    default_allowed_hosts.append(vercel_url)

ALLOWED_HOSTS = get_env_list(
    'ALLOWED_HOSTS',
    default=default_allowed_hosts,
)


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_filters',
    'cloudinary',
    'corsheaders',
    'api',
    'properties',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'root.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'root.wsgi.application'


database_url = os.getenv('DATABASE_URL')
if database_url:
    parsed = urlparse(database_url)
    if parsed.scheme not in {'postgres', 'postgresql'}:
        raise ImproperlyConfigured('DATABASE_URL must be a postgres URL.')

    db_options = dict(parse_qsl(parsed.query))
    if not DEBUG:
        db_options.setdefault('sslmode', 'require')

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': parsed.path.lstrip('/'),
            'USER': parsed.username,
            'PASSWORD': parsed.password,
            'HOST': parsed.hostname,
            'PORT': parsed.port or 5432,
            'CONN_MAX_AGE': int(os.getenv('DB_CONN_MAX_AGE', '60')),
            'OPTIONS': db_options,
        }
    }
elif DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    raise ImproperlyConfigured('DATABASE_URL is required when DEBUG=False.')


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STORAGES = {
    'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
    'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
}
if not DEBUG:
    STORAGES['staticfiles'] = {
        'BACKEND': 'whitenoise.storage.CompressedStaticFilesStorage'
    }
    WHITENOISE_USE_FINDERS = True


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure=True,
)


REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': int(os.getenv('PAGE_SIZE', '10')),
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'api.authentication.FirebaseAuthentication',
    ],
}


default_cors_allowed_origins = ['http://localhost:3000', 'http://localhost:5173']
default_cors_allowed_origin_regexes = [] if DEBUG else [r'^https://.*\.vercel\.app$']
default_csrf_trusted_origins = ['http://localhost:3000', 'http://localhost:5173']
if not DEBUG:
    default_csrf_trusted_origins.append('https://*.vercel.app')

CORS_ALLOWED_ORIGINS = get_env_list('CORS_ALLOWED_ORIGINS', default=default_cors_allowed_origins)
CORS_ALLOWED_ORIGIN_REGEXES = get_env_list(
    'CORS_ALLOWED_ORIGIN_REGEXES',
    default=default_cors_allowed_origin_regexes,
)
CSRF_TRUSTED_ORIGINS = get_env_list('CSRF_TRUSTED_ORIGINS', default=default_csrf_trusted_origins)
CORS_ALLOW_CREDENTIALS = get_env_bool('CORS_ALLOW_CREDENTIALS', True)


SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
if not DEBUG:
    SECURE_SSL_REDIRECT = get_env_bool('SECURE_SSL_REDIRECT', True)
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = int(os.getenv('SECURE_HSTS_SECONDS', '31536000'))
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
    X_FRAME_OPTIONS = 'DENY'


from root.firebase import initialize_firebase

initialize_firebase()
