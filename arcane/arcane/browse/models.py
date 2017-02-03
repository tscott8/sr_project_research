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
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=7, default='#D50000')
    icon = models.ImageField(upload_to=upload_genre_icon, blank=True, null=True)

    def __str__(self):
        return self.name

def upload_artist_photo(instance, file):
    return instance.name + "/images/" + file

class Artist(models.Model):
    name = models.CharField(max_length=50, unique=True)
    # user_id <- do me later
    genre = models.ForeignKey(Genre, blank=True, null=True)
    cover_photo = models.ImageField(upload_to=upload_artist_photo, blank=True, null=True)

    def __str__(self):
        return self.name

def upload_album_artwork(instance, file):
    return instance.artist.name + "/" + instance.name + "/artwork/" + file

class Album(models.Model):
    name = models.CharField(max_length=50)
    artist = models.ForeignKey(Artist, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    artwork =  models.ImageField(upload_to=upload_album_artwork, blank=True, null=True)

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
            try:
                iTitle = id3.get('title', '')[0]
            except IndexError:
                iTitle = "unknown_track"
            try:
                iAlbum = id3.get('album', '')[0]
            except IndexError:
                iAlbum = "unknown_album"
            try:
                iArtist = id3.get('artist', '')[0]
            except IndexError:
                iArtist = "unknown_artist"
            try:
                iGenre = id3.get('genre', '')[0]
            except IndexError:
                iGenre = "unknown_genre"
            print (iTitle, iAlbum, iArtist, iGenre)
            if not self.name: self.name = iTitle
            if not self.genre:
                try:
                    check = Genre.objects.get(name=iGenre)
                    self.genre = check
                except Genre.DoesNotExist:
                    new_genre = Genre(name=iGenre)
                    new_genre.save()
                    self.genre = new_genre

            if not self.artist:
                try:
                    check = Artist.objects.get(name=iArtist)
                    self.artist = check
                except Artist.DoesNotExist:
                    new_artist = Artist(name=iArtist, genre=self.genre)
                    new_artist.save()
                    self.artist = new_artist

            if not self.album:
                try:
                    check = Album.objects.get(name=iAlbum)
                    self.album = check
                except Album.DoesNotExist:
                    new_album = Album(name=iAlbum, genre=self.genre, artist=self.artist)
                    new_album.save()
                    self.album = new_album

            path = default_storage.delete(os.path.join(settings.MEDIA_ROOT,'tmp','temp.mp3'))
        super(Track, self).clean()
