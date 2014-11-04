# -*- coding: utf-8 -*-
from settings import *

DEBUG = False

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

DEFAULT_FROM_EMAIL = '{{ project_name }} <YOUR_USER@gmail.com>'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'YOUR_USER@gmail.com'
EMAIL_HOST_PASSWORD = 'YOUR_PASSWORD'
EMAIL_SUBJECT_PREFIX = '{{ project_name }} - '
EMAIL_PORT = 587
EMAIL_USE_TLS = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '{{ project_name }}',
        'USER': '{{ project_name }}',
        'PASSWORD': '{{ project_name }}',
        'HOST': '',
        'PORT': '',
    }
}
