import * as types from '../constants/ActionTypes';

export function getArtists() {
  return fetch("http://localhost:8000/browse/artists").then(response => response.json()).then(json => ({
            type:types.GET_ARTISTS,
            artists: json
          }));
        };
