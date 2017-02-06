# -*- coding: utf-8 -*-

from django import forms


class UploadForm(forms.Form):
    # uploadfile = forms.FileField(label='Select a file')
    uploadfiles = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))

    # uploadtrack = forms.CharField(label='Track Name')
    # uploadalbum = forms.CharField(label='Album Name')
    # uploadartist = forms.CharField(label='Artist Name')
    # uploadgenre = forms.CharField(label='Genre Name')
