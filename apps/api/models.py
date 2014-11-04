# -*- coding: utf-8 -*-
from apps.api.signals import invalidate_api_token, invalidate_token

invalidate_api_token.connect(invalidate_token)
