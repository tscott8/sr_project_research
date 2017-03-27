import { GET_ARTIST_PROFILE, GET_ARTIST_MEMBERS, GET_ARTIST_SUMMARIES } from '../constants/ActionTypes';

const initialState = {
   artist: {},
   members: [],
   summaries: []
};

export default function profile(state = initialState, action) {
   switch (action.type) {
      case GET_ARTIST_PROFILE:
         return {...state, artist: action.profile}
      case GET_ARTIST_MEMBERS:
         return {...state, members: action.members}
      case GET_ARTIST_SUMMARIES:
         return {...state, summaries: action.summaries}
      default:
         return state;
   }
}
