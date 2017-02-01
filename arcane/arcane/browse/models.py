from django.db import models
from mutagen.easyid3 import EasyID3
from django.utils.translation import ugettext_lazy as _
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
from arcane import settings

def upload_genre_icon(instance, file):
    return instance.name + "/icons/" + file

class Genre(models.Model):
    name = models.CharField(max_length=50, default='unknown_genre')
    color = models.CharField(max_length=7, default='#D50000')
    icon = models.ImageField(upload_to=upload_genre_icon, default=None)

    def __str__(self):
        return self.name

def upload_artist_photo(instance, file):
    return instance.name + "/images/" + file

class Artist(models.Model):
    name = models.CharField(max_length=50, default='unknown_artist')
    # user_id <- do me later
    genre = models.ForeignKey(Genre, blank=True, null=True)
    cover_photo = models.ImageField(upload_to=upload_artist_photo, default=None)

    def __str__(self):
        return self.name

def upload_album_artwork(instance, file):
    return instance.artist.name + "/" + instance.name + "/artwork/" + file

class Album(models.Model):
    name = models.CharField(max_length=50, default='unknown_album')
    artist = models.ForeignKey(Artist, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    artwork =  models.ImageField(upload_to=upload_album_artwork, default=None)

    def __str__(self):
        return self.name

def upload_track(instance, file):
    return instance.artist.name + "/" + instance.album.name + "/" + file

class Track(models.Model):
    play_count = models.BigIntegerField(default=0)
    url = models.FileField(upload_to=upload_track, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    artist = models.ForeignKey(Artist, blank=True, null=True)
    album = models.ForeignKey(Album, blank=True, null=True)
    name = models.CharField(max_length=200, blank=True)
    # artist = models.CharField(max_length=200, default='unknown_artist')
    # album = models.CharField(max_length=200, default='unknown_album')
    # genre = models.CharField(max_length=200, default='unknown_genre')

    def __str__(self):
        return self.name

    def clean(self):
        if self.url:
            path = default_storage.save(os.path.join(settings.MEDIA_ROOT,'tmp','temp.mp3'),
                   ContentFile(self.url.file.read()))
            id3 = EasyID3(os.path.join(settings.MEDIA_ROOT, path))
            print (id3.get('title', ''),id3.get('album', ''),id3.get('artist', ''),id3.get('genre', ''))
            if not self.name: self.name = id3.get('title', '')[0]
            new_genre = Genre(name=id3.get('genre', '')[0])
            if not self.genre:
                self.genre = new_genre
                new_genre.save()
            new_artist = Artist(name=id3.get('artist', '')[0], genre=new_genre)
            if not self.artist:
                self.artist = new_artist
                new_artist.save()
            new_album = Album(name=id3.get('album', '')[0], genre=new_genre, artist=new_artist)
            if not self.album:
                self.album = new_album
                new_album.save()

            path = default_storage.delete(os.path.join(settings.MEDIA_ROOT,'tmp','temp.mp3'))
        super(Track, self).clean()
