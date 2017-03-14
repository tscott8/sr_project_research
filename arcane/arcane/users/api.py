from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets, filters

from .models import Settings, User, Login, Playlist
from arcane.browse.api import TrackSerializer

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
    settings = SettingsSerializer(read_only=True)
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'location', 'avatar', 'artist', 'settings')

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_fields = ('id', 'name', 'email', 'artist')

    def perform_create(self, serializer):
        serializer.save()

class LoginSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Login
        fields = ('id', 'username', 'user')

class LoginViewSet(viewsets.ModelViewSet):
    queryset = Login.objects.all()
    serializer_class = LoginSerializer
    filter_fields = ('id', 'username', 'user')

    def perform_create(self, serializer):
        serializer.save()

class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    tracks = TrackSerializer(read_only=True)
    class Meta:
        model = Playlist
        fields = ('id', 'name', 'user', 'tracks')

class PlaylistViewSet(viewsets.ModelViewSet):
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
