import * as types from '../constants/ActionTypes';
import cookie from 'react-cookie';


const host = "http://localhost:8000/api/tracks";

export function getTracks() {
  return fetch(host).then(response => response.json()).then(json => ({
            type:types.GET_TRACKS,
            tracks: json
          }));
        };

export function getAlbumTracks(albumID) {
   return fetch(host+'?album='+albumID).then(response => response.json()).then(json => ({
             type:types.GET_ALBUM_TRACKS,
             tracks: json
           }));
         };

export function uploadTracks(files) {
  let csrftoken = cookie.load('csrftoken');
  let fd = new FormData();
  fd.append('data', files);
  fd.append('enctype', 'multipart/form-data')
  console.log(fd)
  return fetch('http://localhost:8000/api/list/', {
    method: 'post',
    headers: {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': csrftoken
    },
    credentials: 'same-origin',
    body: { 'data': fd }
          }).then(response => response.json()).then(json => ({
            type:types.POST_TRACKS,
            uploadFiles: json
          }));
        };
