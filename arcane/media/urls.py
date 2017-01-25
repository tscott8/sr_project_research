from django.conf.urls import url, include
from . import views, api
from arcane import routers

router = routers.SharedAPIRootRouter()
router.register(r'album', api.AlbumViewSet)
router.register(r'artist', api.ArtistViewSet)
router.register(r'genre', api.GenreViewSet)
router.register(r'song', api.SongViewSet)


urlpatterns = [
    url(r'^$', views.index, name="index"),
]
