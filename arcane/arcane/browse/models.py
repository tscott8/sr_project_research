from django.db import models
import mutagen
import mutagen.easyid3
import mutagen.id3
from django.utils.translation import ugettext_lazy as _
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.template.defaultfilters import slugify
import os
from arcane import settings
from subprocess import call, check_output
from urllib.request import urlopen
from PIL import Image
from io import BytesIO
import requests

def upload_genre_icon(instance, file):
    return slugify(instance.name) + "/icons/" + file

class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)
    color = models.CharField(max_length=7, default='#D50000')
    icon = models.ImageField(upload_to=upload_genre_icon, blank=True, null=True)

    # def __str__(self):
    #     return '%d: %s' % (self.id, self.name)
    def __str__(self):
        return self.name

    def __unicode__(self):
        return '%d: %s' % (self.id, self.name)

def upload_artist_photo(instance, file):
    return slugify(instance.name) + "/images/" + file

def snag_artist_photo(artist):
    # get image url
    if artist is 'No Artist':
        return None
    else:
        url = "https://api.spotify.com/v1/search?q="+slugify(artist)+"&type=artist"
        response = requests.get(url).json()
        img_url = response['artists']['items'][0]['images'][0]['url']
        print (img_url)
        # download image
        path = os.path.join(settings.MEDIA_ROOT, slugify(artist) , "images" , "profile.jpg")
        image_request_result = requests.get(img_url)
        image = Image.open(BytesIO(image_request_result.content))
        width, height = image.size
        max_size = [600, 600]
        # resize image
        if width > 600 or height > 600:
            image.thumbnail(max_size)
        image_io = BytesIO()
        image.save(image_io, format='JPEG')
        default_storage.save(path, ContentFile(image_io.getvalue()))
        return slugify(artist) + "/images/profile.jpg"

class Artist(models.Model):
    name = models.CharField(max_length=50, unique=True)
    # user_id <- do me later
    genre = models.ForeignKey(Genre, related_name='artists', blank=True, null=True)
    cover_photo = models.ImageField(upload_to=upload_artist_photo, blank=True, null=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return '%d: %s' % (self.id, self.name)
    def save(self, *args, **kwargs):
        if not self.cover_photo:
            self.cover_photo = snag_artist_photo(self.name)
        super(Artist, self).save(*args, **kwargs)


def upload_album_artwork(instance, file):
    return slugify(instance.artist.name) + "/" + slugify(instance.name) + "/artwork/" + file

class Album(models.Model):
    name = models.CharField(max_length=50)
    artist = models.ForeignKey(Artist, related_name='albums', blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    artwork = models.ImageField(upload_to=upload_album_artwork, blank=True, null=True)

    # def __str__(self):
    #     return '%d: %s' % (self.id, self.name)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return '%d: %s' % (self.id, self.name)

def upload_track(instance, file):
    return slugify(instance.artist.name) + "/" + slugify(instance.album.name) + "/" + file

def get_track_info(filename):
    short_tags = full_tags = mutagen.File(filename)
    if isinstance(full_tags, mutagen.mp3.MP3):
        short_tags = mutagen.easyid3.EasyID3(filename)
    try:
        artwork = full_tags.tags['APIC:'].data
    except:
        artwork = 'No Artwork'
    track_info = {
        'title': short_tags.get('title', ['No Title'])[0],
        'album': short_tags.get('album', ['No Album'])[0],
        'artwork': artwork, # access APIC frame and grab the image,
        'artist': short_tags.get('albumartist', short_tags.get('artist', ['No Artist']))[0],
        'genre': short_tags.get('genre', ['No Genre'])[0],
        'duration': "%u:%.2d" % (full_tags.info.length / 60, full_tags.info.length % 60),
        'length': full_tags.info.length,
        'order': short_tags.get('tracknumber', ['0'])[0],
        'size': os.stat(filename).st_size,
        'bpm': short_tags.get('bpm', ['0'])[0]
    }
    if artwork is 'No Artwork':
        print('No Artwork Found... Downloading Now...')
        path = os.path.join(settings.MEDIA_ROOT,'tmp','temp.jpg')
        cmd = " ".join(["sacad", "\""+track_info['artist']+"\"",  "\""+track_info['album']+"\"", "600",  path])
        call(cmd)
        try:
            f = open(path, 'rb')
            track_info['artwork'] = f.read()
            f.close()
            print('Artwork Downloaded...')
        except:
            print('Unable to Download Artwork.. ')
    return track_info

def save_album_artwork(data, artist, album):
    path = os.path.join(settings.MEDIA_ROOT, slugify(artist) , slugify(album) , "artwork.jpg")
    if data != 'No Artwork':
        artworkLocation = default_storage.save(path, ContentFile(data))
        return (slugify(artist) +"/" + slugify(album) +"/"+ "artwork.jpg")
    else:
        return None

class Track(models.Model):
    play_count = models.BigIntegerField(default=0)
    url = models.FileField(upload_to=upload_track, blank=True, null=True)
    genre = models.ForeignKey(Genre, blank=True, null=True)
    artist = models.ForeignKey(Artist, blank=True, null=True)
    album = models.ForeignKey(Album, related_name='tracks', blank=True, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=True)
    duration = models.CharField(max_length=200, blank=True)
    length = models.BigIntegerField(blank=True)
    order = models.IntegerField(blank=True, null=True)

    class Meta:
        # unique_together = ('album', 'order')
        ordering = ['order']

    def __str__(self):
        # return '%d: %s' % (self.id, self.name)
        return self.name
    def __unicode__(self):
        return '%d: %s' % (self.id, self.name)

    def save(self, *args, **kwargs):
        if self.url:
            path = default_storage.save(os.path.join(settings.MEDIA_ROOT,'tmp','temp.mp3'),
                   ContentFile(self.url.file.read()))
            track = get_track_info(os.path.join(settings.MEDIA_ROOT, path))
            iTitle, iAlbum, iArtwork, iArtist, iGenre, iDuration, iLength, iOrder = track['title'], track['album'], track['artwork'], track['artist'], track['genre'], track['duration'], track['length'], track['order']
            iOrder = int(iOrder.split('/')[0]) if (iOrder != '0') else None
            print ('Uploading... [', iOrder, iTitle, iAlbum, iArtist, iGenre, iDuration, iLength,']')
            if not self.name:
                try:
                    check = Track.objects.get(name=iTitle)
                    print('Upload Failed... [', iOrder, check, iTitle, iAlbum, iArtist, iGenre, iDuration, iLength, '] already exists...')
                    return
                except Track.DoesNotExist:
                    self.name = iTitle
                    self.duration = iDuration
                    self.length = iLength
                    self.order = iOrder

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
                    new_artwork = save_album_artwork(iArtwork,iArtist,iAlbum)
                    new_album = Album(name=iAlbum, genre=self.genre, artist=self.artist, artwork=new_artwork)
                    new_album.save()
                    self.album = new_album
            path = default_storage.delete(os.path.join(settings.MEDIA_ROOT,'tmp','temp.mp3'))
        super(Track, self).save(*args, **kwargs)
