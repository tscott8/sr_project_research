import * as types from '../constants/ActionTypes';


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
