from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length=50, default='unknown_genre')
    color = models.CharField(max_length=7, default='#D50000')
    icon = models.FilePathField()

    def __unicode__(self):
        return genre

class Artist(models.Model):
    name = models.CharField(max_length=50, default='unknown_artist')
    # user_id <- do me later
    genre = models.ForeignKey(Genre, blank=True, null=True)
    cover_photo = models.FilePathField()

    def __unicode__(self):
        return artist

class Album(models.Model):
    name = models.CharField(max_length=50, default='unknown_album')
    artist = models.ForeignKey(Artist, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    artwork = models.FilePathField()

    def __unicode__(self):
        return album

class Song(models.Model):
    name = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, blank=True, null=True)
    album = models.ForeignKey(Album, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    url = models.FilePathField()
    play_count = models.BigIntegerField()

    def __unicode__(self):
        return song
