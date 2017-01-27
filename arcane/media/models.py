from django.db import models

def upload_genre_icon(instance, file):
    return "storage/genres/" + instance.name + "/icons"

class Genre(models.Model):
    name = models.CharField(max_length=50, default='unknown_genre')
    color = models.CharField(max_length=7, default='#D50000')
    icon = models.ImageField(upload_to=upload_genre_icon, default=None)

    def __str__(self):
        return self.name

def upload_artist_photo(instance, file):
    return "storage/artists/" + instance.name + "/images"

class Artist(models.Model):
    name = models.CharField(max_length=50, default='unknown_artist')
    # user_id <- do me later
    genre = models.ForeignKey(Genre, blank=True, null=True)
    cover_photo = models.ImageField(upload_to=upload_artist_photo, default=None)

    def __str__(self):
        return self.name

def upload_album_artwork(instance, file):
    return "storage/artists/" + instance.artist.name + "/albums/" + instance.name + "/images"

class Album(models.Model):
    name = models.CharField(max_length=50, default='unknown_album')
    artist = models.ForeignKey(Artist, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    artwork =  models.ImageField(upload_to=upload_album_artwork, default=None)

    def __str__(self):
        return self.name

def upload_song(instance, file):
    return "storage/artists/" + instance.artist.name + "/albums/" + instance.album.name + "/tracks/" + file

class Song(models.Model):
    name = models.CharField(max_length=200, default='unknown_track')
    artist = models.ForeignKey(Artist, blank=True, null=True)
    album = models.ForeignKey(Album, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    url = models.FileField(upload_to=upload_song, default=None)
    play_count = models.BigIntegerField(default=0)

    def __str__(self):
        return self.name
