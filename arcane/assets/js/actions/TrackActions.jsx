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
  fd.append('enctype', 'multipart/form-data')
  files.forEach((file) =>{
    fd.append('uploadfiles', file);
  })
  return fetch("http://localhost:8000/api/upload/", {
    method: "post",
    headers: {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryqeSHn9XydiiEWmbj",
    "X-CSRFToken": csrftoken
    },
    credentials: "same-origin",
    body:fd,
    })
    .then(response => response.json())
    .then(json => ({
            type:types.POST_TRACKS,
            uploadFiles: json
          }));
        };
