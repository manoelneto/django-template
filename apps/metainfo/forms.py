# -*- coding: utf-8 -*-
from django import forms

from apps.metainfo.models import MetaInfo


class MetaInfoForm(forms.ModelForm):

    class Meta:
        model = MetaInfo
        widgets = {
            'url': forms.TextInput(attrs={'class': 'input-xlarge'}),
            'title': forms.TextInput(attrs={'class': 'input-xxlarge'}),
            'description': forms.TextInput(attrs={'class': 'input-xxlarge'}),
            'keywords': forms.TextInput(attrs={'class': 'input-xxlarge'}),
            'author': forms.TextInput(attrs={'class': 'input-xxlarge'}),
        }

    def clean_url(self):
        url = self.cleaned_data.get('url')

        if self.instance:
            pk = self.instance.pk
            search = MetaInfo.objects.exclude(pk=pk).filter(
                url=url
            )
        else:
            search = MetaInfo.objects.filter(
                url=url
            )

        if search:
            raise forms.ValidationError(
                u'Url em uso.'
            )

        return url
