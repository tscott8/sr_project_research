# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from arcane.browse.views import list
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from . import views, api
from django.views import generic

schema_view = get_schema_view(title="Arcane API")

router = DefaultRouter()
router.register(r'albums', api.AlbumViewSet)
router.register(r'artists', api.ArtistViewSet)
router.register(r'genres', api.GenreViewSet)
router.register(r'tracks', api.TrackViewSet)

urlpatterns = [
    url(r'^list/$', list, name='list'),
    url('^schema/$', schema_view),
    url(r'^', include(router.urls)),
]
