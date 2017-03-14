import * as types from '../constants/ActionTypes';

const host = "http://localhost:8000/api/artists";

export function getArtists() {
  return fetch(host).then(response => response.json()).then(json => ({
            type:types.GET_ARTISTS,
            artists: json
          }));
        };
export function getGenreArtists(genreID) {
   return fetch(host+'?genre='+genreID).then(response => response.json()).then(json => ({
             type:types.GET_GENRE_ARTISTS,
             artists: json
           }));
         };
