from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view
from . import views, api
from arcane import routers

schema_view = get_schema_view(title="Arcane API")

router = DefaultRouter()
router.register(r'album', api.AlbumViewSet)
router.register(r'artist', api.ArtistViewSet)
router.register(r'genre', api.GenreViewSet)
router.register(r'song', api.SongViewSet)


urlpatterns = [
    url('^schema/$', schema_view),
    url(r'^', include(router.urls)),
]
