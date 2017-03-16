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
    serializer_class = GenreSerializer
    queryset = Genre.objects.all()
    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('name', 'id')
    ordering_fields = ('name','color')
    ordering=('name')
    lookup_field = "id"

    def perform_create(self, serializer):
        serializer.save()


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    genre = GenreSerializer(read_only=True)
    albums = serializers.StringRelatedField(many=True)
    class Meta:
        model = Artist
        fields = ('id', 'name', 'genre', 'cover_photo', 'albums')

class ArtistViewSet(viewsets.ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()
    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('name', 'id', 'genre')
    ordering_fields = ('name','genre')
    ordering=('name')
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
    serializer_class = AlbumSerializer
    queryset = Album.objects.all()
    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('name', 'id', 'artist', 'genre')
    ordering_fields = ('name','artist','genre','id')
    ordering = ('name',)
    lookup_field = "id"

    def perform_create(self, serializer):
        serializer.save()


class TrackSerializer(serializers.HyperlinkedModelSerializer):
    artist = ArtistSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)
    album = AlbumSerializer(read_only=True)

    class Meta:
        model = Track
        fields = ('id', 'order', 'name', 'duration', 'length', 'artist', 'album', 'genre', 'url', 'play_count')

class TrackViewSet(viewsets.ModelViewSet):
    serializer_class = TrackSerializer
    queryset = Track.objects.all()
    filter_backends = (filters.DjangoFilterBackend,filters.OrderingFilter,)
    filter_fields = ('album', 'id', 'name', 'genre')
    ordering_fields = ('order', 'name','album','artist','genre','id')
    ordering = ('name',)
    lookup_field = "id"

    # def filter_queryset(self, queryset):
    #     queryset = super(TrackViewSet, self).filter_queryset(queryset)
    #     return queryset.order_by('name')

    def perform_create(self, serializer):
        serializer.save()

def router_register(router):
    router.register(r'users', AlbumViewSet)
    router.register(r'users', ArtistViewSet)
    router.register(r'users', GenreViewSet)
    router.register(r'users', TrackViewSet)
