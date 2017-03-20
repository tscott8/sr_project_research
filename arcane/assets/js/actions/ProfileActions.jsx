import * as types from '../constants/ActionTypes';

const host = "http://localhost:8000/api";

export function getArtistProfile(id) {
   return fetch(host + "/artists/?id=" + id)
   .then(response => response.json())
   .then(json => ({
      type: types.GET_ARTIST_PROFILE,
      profile: json.results[0]
   }));
}

export function getArtistMembers(id) {
   return fetch(host + "/users/users/?artist=" + id)
   .then(response => response.json())
   .then(json => ({
      type: types.GET_ARTIST_MEMBERS,
      members: json.results
   }));
}
