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
        files = request.FILES.getlist('uploadfiles')
        if form.is_valid():
            for f in files:
                Track.objects.create(url=f)
            # Redirect to the track list after POST
            return HttpResponseRedirect(reverse('list'))
    else:
        form = UploadForm()  # A empty, unbound form

    # Load documents for the list page
    tracks = Track.objects.all()
    albums = Album.objects.all()
    artists = Artist.objects.all()
    genres = Genre.objects.all()

    # Render list page with the documents and the form
    return render(
        request,
        'list.html',
        {'tracks': tracks,
         'albums': albums,
         'artists': artists,
         'genres': genres,
         'form': form}
    )

def upload(request):
    if request.method == 'POST':
        form = UploadForm(request.POST, request.FILES)
        files = request.FILES.getlist('uploadfiles')
        # if form.is_valid():
        for f in files:
            Track.objects.create(url=f)
        # Redirect to the track list after POST
        return HttpResponseRedirect(reverse('upload'))
    else:
        form = UploadForm()  # A empty, unbound form
    tracks=Track.objects.all()
    # Render list page with the documents and the form
    return render(
        request,
        'upload.html',
        {'tracks': tracks}
)
