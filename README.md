# Arcane

![alt text][img1]

## Table of Contents
* [Introduction](#introduction)
* [Goal](#goal)
* [Resources](#resources)
* [Getting Started](#getting-started)
* [API Setup](#api-setup)
* [Client Setup](#client-setup)
* [Running Arcane](#running-arcane)
* [Challenges](#challenges)
* [How](#how)
* [Documentation](#documentation)
* [Contributors](#contributors)

![alt text][img2]

## Introduction
This is a test repo for all of the tinkering and research during the senior project process Winter 2017

![alt text][img3a]

## Goal
<DETAIL HERE>

![alt text][img3d]

## Resources
* [Python 3.5](https://www.python.org/) - see [requirements](http://tscott8.github.io/sr_project_researc/requirements.txt) for more detail
  * [Django](https://www.djangoproject.com/)
  * [Django Rest Framework](http://www.django-rest-framework.org/)
  * [Pillow](https://pillow.readthedocs.io/en/4.0.x/)
  * [Mutagen](https://mutagen.readthedocs.io/en/latest/)
  * [Sacad](https://github.com/desbma/sacad)
* [Node.js](https://nodejs.org/en/) - see [requirements](http://tscott8.github.io/sr_project_researc/arcane/package.json) for more detail
  * [React](https://facebook.github.io/react/)
  * [Redux](http://redux.js.org/)
  * [Material UI](http://www.material-ui.com/#/)
  * [Webpack](https://webpack.github.io/)

![alt text][img3f]



## Getting Started
Arcane consists of 2 separate parts, server and client, like most web apps. You need to make sure both are configured correctly.
![alt text][img4]  


### API Setup
1. To get started, make sure you have python3 installed.
2. Run `pip install virtualenv` to install a virtual environment kit.
3. From the project directory run `. ./setup.sh` to setup the project. (it should automagically handle everything)
4. You may need to create a new super user to use the admin features.

![alt text][img5]

### Client Setup
1. to get started, make sure you have node installed.
2. In the `<project_folder>/arcane` run `npm install`. (this should take care of everything.)

![alt text][img6]

### Running Arcane
1. Once the setup has completed you should already be running the Django server. If the Django server is not running:
  * Open a terminal in the project directory and run `source env/Scripts/activate` (Windows) or `source env/bin/activate` (Linux/OSX). This will activate your virtual environment that has all the django and python dependencies installed.
  * Then change to the arcane directory using `cd arcane` and start the django server with `./manage.py runserver`
2. Open up another terminal in the project arcane directory and start the node server using `node server.js`. This will start webpack as well
3. Now open a browser and go to `http://localhost:8000/`
![alt text][img7]

## Challenges
![alt text][img8]  

## How

![alt text][img3e]  

## Documentation
<under construction>

## Tutorials

#### Login
![alt text][gif1]

#### Navigation
![alt text][gif2]

#### Uploading Music
![alt text][gif3]

##### Using the Radio
![alt text][gif4]

##### Managing your Music (adding to the queue)
![alt text][gif5]

##### Changing Settings
![alt text][gif6]

## Contributors
1. [Tyler Scott](https://github.com/tscott8)
2. [Shem Sedrick](https://github.com/ssedrick)


[img1]:/arcane/static/images/screenshots/splashpage.png "splashpage"
[img2]:/arcane/static/images/screenshots/login.png "login modal"
[img3a]:/arcane/static/images/screenshots/my_music_albums.png "my music"
[img3b]:/arcane/static/images/screenshots/my_music_artists.png "artists"
[img3c]:/arcane/static/images/screenshots/my_music_genres.png "genres"
[img3d]:/arcane/static/images/screenshots/my_music_tracks.png "tracks"
[img3e]:/arcane/static/images/screenshots/my_music_artist_albums.png "artist albums"
[img3f]:/arcane/static/images/screenshots/my_music_album_tracks.png "album tracks"
[img4]:/arcane/static/images/screenshots/profile.png "profile"
[img5]:/arcane/static/images/screenshots/radio.png "radio"
[img6]:/arcane/static/images/screenshots/upload.png "upload"
[img7]:/arcane/static/images/screenshots/settings.png "settings"
[img8]:/arcane/static/images/screenshots/browse.png "browse"

[gif1]:/arcane/static/images/tutorials/login.gif "login"
[gif2]:/arcane/static/images/tutorials/browse_play.gif "browse & header component"
[gif3]:/arcane/static/images/tutorials/upload.gif "upload component"
[gif4]:/arcane/static/images/tutorials/radio.gif "radio component"
[gif5]:/arcane/static/images/tutorials/my_music2.gif "my music components"
[gif6]:/arcane/static/images/tutorials/settings.gif "settings component"
