import * as types from '../constants/ActionTypes';

export function getTracks() {
  return fetch("http://localhost:8000/browse/tracks").then(response => response.json()).then(json => ({
            type:types.GET_TRACKS,
            tracks: json
          }));
        };
