# -*- coding: utf-8 -*-
from rest_framework import permissions


class UserTokenPermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return True

    def has_permission(self, request, view):
        return True


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        try:
            return obj.user.pk == request.user.pk
        except:
            return False


class IsAuthenticatedOrListReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        if request.user.pk:
            return True

        return False
