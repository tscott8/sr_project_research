import * as types from '../constants/ActionTypes';

const host = "http://localhost:8000/api";

export function getUserPlaylists(userID) {
   return fetch(host + "/users/playlists/?user=" + userID)
   .then(response => response.json())
   .then(json => ({
      type: types.GET_USER_PLAYLISTS,
      playlists: json.results
   }));
}
