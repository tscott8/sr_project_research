from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets, filters

from .models import Genre, Artist, Album, Track

class GenreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'name', 'color', 'icon')

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

    def perform_create(self, serializer):
        serializer.save()


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    genre = GenreSerializer(read_only=True)

    class Meta:
        model = Artist
        fields = ('id', 'name', 'genre', 'cover_photo')

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    def perform_create(self, serializer):
        serializer.save()


class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    artist = ArtistSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    # tracks = TrackSerializer(read_only=True, many=True)
    # tracks = serializers.StringRelatedField(read_only=True)
    # tracks = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # genre = serializers.StringRelatedField()
    # artist = serializers.StringRelatedField()
    tracks = serializers.StringRelatedField(many=True)
    class Meta:
        model = Album
        fields = ('id', 'name', 'artist', 'genre', 'artwork', 'tracks')

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def perform_create(self, serializer):
        serializer.save()


class TrackSerializer(serializers.HyperlinkedModelSerializer):
    artist = ArtistSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    album = AlbumSerializer(read_only=True)
    # album = serializers.StringRelatedField()
    # artist = serializers.StringRelatedField()
    # genre = serializers.StringRelatedField()

    class Meta:
        model = Track
        fields = ('id', 'order', 'name', 'duration', 'length', 'artist', 'album', 'genre', 'url', 'play_count')

class TrackViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('album', 'id')
    serializer_class = TrackSerializer
    queryset = Track.objects.all()
    lookup_field = "id"

    def perform_create(self, serializer):
        serializer.save()

def router_register(router):
    router.register(r'users', AlbumViewSet)
    router.register(r'users', ArtistViewSet)
    router.register(r'users', GenreViewSet)
    router.register(r'users', TrackViewSet)
