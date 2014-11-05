# -*- coding: utf-8 -*-
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

admin.autodiscover()

urlpatterns = patterns(
    '',
    # admin
    url(r'^ckeditor/', include('ckeditor.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include("apps.api.urls")),
    url(r'^', include("apps.core.urls")),
)

if settings.DEBUG:
    urlpatterns += patterns(
        '',
        (
            r'^media/(?P<path>.*)$',
            'django.views.static.serve',
            {
                'document_root': settings.MEDIA_ROOT,
                'show_indexes': True
            }
        ),
    )
