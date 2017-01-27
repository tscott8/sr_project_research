from django.db import models
import re
class Genre(models.Model):
    name = models.CharField(max_length=50, default='unknown_genre')
    color = models.CharField(max_length=7, default='#D50000')
    icon = models.ImageField(upload_to="storage/genres/unknown/icons", default=None)

    def __str__(self):
        return self.name

class Artist(models.Model):
    name = models.CharField(max_length=50, default='unknown_artist')
    # user_id <- do me later
    genre = models.ForeignKey(Genre, blank=True, null=True)
    cover_photo = models.ImageField(upload_to="storage/artists/unknown/images", default=None)

    def __str__(self):
        return self.name

class Album(models.Model):
    name = models.CharField(max_length=50, default='unknown_album')
    artist = models.ForeignKey(Artist, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    artwork =  models.ImageField(upload_to="storage/artists/unknown/albums/unknown/artwork", default=None)

    def __str__(self):
        return self.name

class Song(models.Model):
    name = models.CharField(max_length=200, default='unknown_track')
    artist = models.ForeignKey(Artist, blank=True, null=True)
    album = models.ForeignKey(Album, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    url = models.FileField(upload_to="storage/artists/unknown/albums/unknown/tracks", default=None)
    play_count = models.BigIntegerField(default=0)

    def __str__(self):
        return self.name
