# -*- coding: utf-8 -*-
from apps.metainfo.models import MetaInfo


class MetaInfoMixin(object):

    meta_title = ''
    meta_description = ''
    meta_keywords = ''
    meta_author = ''
    meta_image = ''

    def load_meta_tags(self):
        try:
            metainfo = MetaInfo.objects.get(url=self.request.path_info)
            self.meta_title = metainfo.title
            self.meta_description = metainfo.description
            self.meta_keywords = metainfo.keywords
            self.meta_author = metainfo.author
            self.meta_image = metainfo.image
        except:
            self.get_meta_tags()

    def get_meta_tags(self):
        pass

    def get_context_data(self, **kwargs):
        context = super(MetaInfoMixin, self).get_context_data(**kwargs)
        self.load_meta_tags()
        context['meta_title'] = self.meta_title
        context['meta_description'] = self.meta_description
        context['meta_keywords'] = self.meta_keywords
        context['meta_author'] = self.meta_author
        context['meta_image'] = self.meta_image
        return context
