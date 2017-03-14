from django.conf.urls import url, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets, filters

from .models import Genre, Artist, Album, Track

class GenreSerializer(serializers.HyperlinkedModelSerializer):
    artists = serializers.StringRelatedField(many=True)
    class Meta:
        model = Genre
        fields = ('id', 'name', 'color', 'icon', 'artists')

class GenreViewSet(viewsets.ModelViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    filter_fields = ('name', 'id')

    def perform_create(self, serializer):
        serializer.save()


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    genre = GenreSerializer(read_only=True)
    albums = serializers.StringRelatedField(many=True)
    class Meta:
        model = Artist
        fields = ('id', 'name', 'genre', 'cover_photo', 'albums')

class ArtistViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('name', 'id', 'genre')
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    lookup_field = "id"

    def perform_create(self, serializer):
        serializer.save()


class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    artist = ArtistSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    tracks = serializers.StringRelatedField(many=True)
    class Meta:
        model = Album
        fields = ('id', 'name', 'artist', 'genre', 'artwork', 'tracks')

class AlbumViewSet(viewsets.ModelViewSet):
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('name', 'id', 'artist', 'genre')
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    lookup_field = "id"

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
    filter_fields = ('album', 'id', 'name', 'genre')
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
