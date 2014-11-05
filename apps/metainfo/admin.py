# -*- coding: utf-8 -*-
from django.contrib import admin

from apps.metainfo.models import MetaInfo
from apps.metainfo.forms import MetaInfoForm


class MetaInfoAdmin(admin.ModelAdmin):

    list_display = (
        'url', 'title', 'description'
    )
    search_fields = ['title', 'description']
    form = MetaInfoForm
    save_as = True


admin.site.register(MetaInfo, MetaInfoAdmin)
