# -*- coding: utf-8 -*-
from rest_framework import pagination
from rest_framework import serializers
from rest_framework.templatetags.rest_framework import replace_query_param


class PageRangeSerializer(serializers.Field):
    page_field = 'page'

    def to_native(self, page_range):
        response = []
        request = self.context.get('request')
        url = request and request.build_absolute_uri() or ''
        for page in page_range:
            response.append(replace_query_param(url, self.page_field, page))
        return response


class CustomPaginationSerializer(pagination.BasePaginationSerializer):
    next = pagination.NextPageField(source='*')
    prev = pagination.PreviousPageField(source='*')
    total_results = serializers.Field(source='paginator.count')
    num_pages = serializers.Field(source='paginator.num_pages')
    per_page = serializers.Field(source='paginator.per_page')
    page_range = PageRangeSerializer(source="paginator.page_range")
