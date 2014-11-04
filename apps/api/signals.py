# -*- coding: utf-8 -*-
import django.dispatch

from rest_framework.authtoken.models import Token

invalidate_api_token = django.dispatch.Signal(providing_args=['instance'])


def invalidate_token(instance, **kwargs):
    user = instance
    tokens = Token.objects.filter(user=user)
    if tokens:
        tokens.delete()
