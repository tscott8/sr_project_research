from django.contrib import admin
from arcane.users.models import Settings, User, Login, Playlist
admin.site.register(Settings)
admin.site.register(User)
admin.site.register(Login)
admin.site.register(Playlist)
# Register your models here.
