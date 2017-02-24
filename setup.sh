#!/bin/bash -e
# SETUP VIRUTAL ENVIRONMENT FOR LOCAL PIP INSTALLS
if [ ! -d "env" ]; then
    virtualenv env
    echo "virtualenv created."
fi
# ACTIVATE VIRTUAL ENVIRONMENT
os=${OSTYPE//[0-9.-]*/}
case "$os" in
  linux*)   source env/bin/activate;;
  msys*)    source env/Scripts/activate;;
esac
echo "virtualenv active"
# INSTALL REQUIREMENTS
pip install -r requirements.txt
echo "requirements installed"
cd arcane
# SETUP NODE
npm install
# SETUP DJANGO
case "$os" in
    linux*)   chmod u+x manage.py;;
esac
./manage.py makemigrations
./manage.py migrate
./manage.py createsuperuser
echo "django configured"
echo "arcane setup complete, starting arcane server"
# START THE SERVER, WEBPACK
case "$os" in
  linux*)   vivaldi "http://localhost:8000/admin";;
  msys*)    start "" "c:\program files (x86)\google\chrome\application\chrome.exe" --new-window "http://localhost:8000/admin";;
esac
./manage.py runserver
# npm start (in a new terminal tab.)
