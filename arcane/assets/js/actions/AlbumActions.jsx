import * as types from '../constants/ActionTypes';

const host = "http://localhost:8000/api/albums";

export function getAlbums() {
  return fetch(host).then(response => response.json()).then(json => ({
            type:types.GET_ALBUMS,
            albums: json
          }));
        };
export function getArtistAlbums(artistID) {
   return fetch(host+'?artist='+artistID).then(response => response.json()).then(json => ({
             type:types.GET_ARTIST_ALBUMS,
             albums: json
           }));
         };
