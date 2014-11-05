# -*- coding: utf-8 -*-
from django.db import models

from filer.fields.image import FilerImageField


class MetaInfo(models.Model):

    url = models.CharField(
        u'url',
        max_length=255,
        help_text=u'Ex: /aovivo/',
        unique=True
    )

    title = models.CharField(
        u'título',
        max_length=255,
    )

    description = models.CharField(
        u'descrição',
        max_length=255,
    )

    keywords = models.CharField(
        u'palavras-chave',
        blank=True,
        max_length=255,
    )

    author = models.CharField(
        u'autor',
        blank=True,
        max_length=255,
    )

    image = FilerImageField(
        verbose_name=u'imagem',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='metainfo_image_set'
    )

    def __unicode__(self):
        return self.url

    class Meta:
        verbose_name = u'meta informação'
        verbose_name_plural = u'meta informações'
        ordering = ['url']
