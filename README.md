# Senior Project Research - Arcane
=========================

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

## Introduction
This is a test repo for all of the tinkering and research during the senior project process Winter 2017

## Goal
<DETAIL HERE>

![alt text][img1]

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

![alt text][img2]  

## Getting Started
Arcane consists of 2 separate parts, server and client, like most web apps. You need to make sure both are configured correctly.

### API Setup
1. To get started, make sure you have python3 installed.
2. Run `pip install virtualenv` to install a virtual environment kit.
3. From the project directory run `. ./setup.sh` to setup the project. (it should automagically handle everything)
4. You may need to create a new super user to use the admin features.

### Client Setup
1. to get started, make sure you have node installed.
2. In the `<project_folder>/arcane` run `npm install`. (this should take care of everything.)

### Running Arcane
1. Once the setup has completed you should already be running the Django server. If the Django server is not running:
  * Open a terminal in the project directory and run `source env/Scripts/activate` (Windows) or `source env/bin/activate` (Linux/OSX). This will activate your virtual environment that has all the django and python dependencies installed.
  * Then change to the arcane directory using `cd arcane` and start the django server with `./manage.py runserver`
2. Open up another terminal in the project arcane directory and start the node server using `node server.js`. This will start webpack as well
3. Now open a browser and go to `http://localhost:8000/`

![alt text][img3]  

## Challenges

![alt text][img4]  

## How

![alt text][img5]  

## Documentation

<under construction>
### Tutorials!

![alt text][gif1]

![alt text][gif2]

![alt text][gif3]

![alt text][gif4]

![alt text][gif5]

![alt text][gif6]


## Contributors
1. [Tyler Scott](https://github.com/tscott8)
2. [Shem Sedrick](https://github.com/ssedrick)


[img1]:/static/images/screenshots/1.png "splashpage screenshot"
[img2]:/static/images/screenshots/2.png "screenshot 2"
[img3]:/static/images/screenshots/3.png "screenshot 3"
[img4]:/static/images/screenshots/4.png "screenshot 4"
[img5]:/static/images/screenshots/5.png "screenshot 5"

[gif1]:/static/images/tutorials/login.gif "login"
[gif2]:/static/images/tutorials/my_music.gif "my music components"
[gif3]:/static/images/tutorials/radio.gif "radio component"
[gif4]:/static/images/tutorials/upload.gif "header components"
[gif5]:/static/images/tutorials/profile.gif "profile component"
[gif6]:/static/images/tutorials/settings.gif "settings component"
