from django.contrib import admin
from arcane.browse.models import Track, Album, Artist, Genre, Song
admin.site.register(Track)
admin.site.register(Artist)
admin.site.register(Album)
admin.site.register(Genre)
admin.site.register(Song)

# Register your models here.
