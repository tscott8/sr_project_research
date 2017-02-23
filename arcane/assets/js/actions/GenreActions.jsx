import * as types from '../constants/ActionTypes';

export function getGenres() {
  return fetch("http://localhost:8000/api/genres").then(response => response.json()).then(json => ({
            type:types.GET_GENRES,
            genres: json
          }));
        };
