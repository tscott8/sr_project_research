from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets, filters

from .models import Settings, Listener, Playlist #, Login
from arcane.browse.api import TrackSerializer, ArtistSerializer
from arcane.browse.models import Artist, Track

class SettingsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Settings
        fields = ('id', 'theme', 'player_pos', 'allow_explicit')

class SettingsViewSet(viewsets.ModelViewSet):
    queryset = Settings.objects.all()
    serializer_class = SettingsSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('id',)

    def perform_create(self, serializer):
        serializer.save()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    settings = serializers.PrimaryKeyRelatedField(queryset=Settings.objects.all())
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())
    class Meta:
        model = Listener
        fields = ('id', 'location', 'avatar', 'artist', 'settings')

class UserViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('id', 'artist')
    queryset = Listener.objects.all()
    serializer_class = UserSerializer
    lookup_field = "id"

    def perform_create(self, serializer):
        serializer.save()
#
# class LoginSerializer(serializers.HyperlinkedModelSerializer):
#     user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
#     class Meta:
#         model = Login
#         fields = ('id', 'username', 'user', 'password')
#
# class LoginViewSet(viewsets.ModelViewSet):
#     filter_backends = (filters.DjangoFilterBackend,)
#     filter_fields = ('id', 'username', 'user')
#     queryset = Login.objects.all()
#     serializer_class = LoginSerializer
#     lookup_field = "id"
#
#     def perform_create(self, serializer):
#         serializer.save()

class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    tracks = serializers.PrimaryKeyRelatedField(queryset=Track.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=Listener.objects.all())
    class Meta:
        model = Playlist
        fields = ('id', 'name', 'user', 'tracks')

class PlaylistViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    filter_fields = ('id', 'user')
    lookup_field = 'id'

    def perform_create(self, serializer):
        serializer.save()

def router_register(router):
    router.register(r'users', SettingsViewSet)
    router.register(r'users', UserViewSet)
    router.register(r'users', LoginViewSet)
    router.register(r'users', PlaylistViewSet)
