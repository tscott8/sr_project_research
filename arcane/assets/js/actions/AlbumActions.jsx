import * as types from '../constants/ActionTypes';

export function getAlbums() {
  return fetch("http://localhost:8000/browse/albums").then(response => response.json()).then(json => ({
            type:types.GET_ALBUMS,
            albums: json
          }));
        };