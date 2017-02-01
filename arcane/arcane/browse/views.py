# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from arcane.browse.models import Track, Artist, Album, Genre
from arcane.browse.forms import UploadForm


def list(request):
    # Handle file upload
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        if form.is_valid():
            # newgenre = Genre(name=request.POST['uploadgenre'])
            # newgenre.save()
            # newartist = Artist(name=request.POST['uploadartist'], genre=newgenre)
            # newartist.save()
            # newalbum = Album(name=request.POST['uploadalbum'], artist=newartist, genre=newgenre)
            # newalbum.save()
            # newtrack = Track(
            #     url=request.FILES['uploadfile'],
            #     name=request.POST['uploadtrack'],
            #     genre=newgenre,
            #     artist=newartist,
            #     album=newalbum,)
            newtrack = Track(url=request.FILES['uploadfile'])
            newtrack.clean()
            newtrack.save()

            # Redirect to the track list after POST
            return HttpResponseRedirect(reverse('list'))
    else:
        form = UploadForm()  # A empty, unbound form

    # Load documents for the list page
    tracks = Track.objects.all()

    # Render list page with the documents and the form
    return render(
        request,
        'list.html',
        {'tracks': tracks, 'form': form}
    )
