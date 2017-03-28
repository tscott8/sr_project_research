import { GET_USER_PLAYLISTS } from '../constants/ActionTypes';

const initialState = {
   playlists: []
}

export default function playlists(state = initialState, action) {
   switch (action.type) {
      case GET_USER_PLAYLISTS:
         return {...state, playlists: action.playlists}
      default:
         return state;
   }
}
