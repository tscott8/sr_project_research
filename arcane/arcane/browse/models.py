from django.db import models

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
    name = models.CharField(max_length=200, default='unknown_track')
    artist = models.ForeignKey(Artist, blank=True, null=True)
    album = models.ForeignKey(Album, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    # artist = models.CharField(max_length=200, default='unknown_artist')
    # album = models.CharField(max_length=200, default='unknown_album')
    # genre = models.CharField(max_length=200, default='unknown_genre')
    url = models.FileField(upload_to=upload_track, default=None)
    play_count = models.BigIntegerField(default=0)

    def __str__(self):
        return self.name
