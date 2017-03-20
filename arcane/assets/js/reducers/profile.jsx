import { GET_ARTIST_PROFILE, GET_ARTIST_MEMBERS } from '../constants/ActionTypes';

const initialState = {
   artist: {},
   members: []
};

export default function profile(state = initialState, action) {
   switch (action.type) {
      case GET_ARTIST_PROFILE:
         return {...state, artist: action.profile}
      case GET_ARTIST_MEMBERS:
         return {...state, members: action.members}
      default:
         return state;
   }
}
