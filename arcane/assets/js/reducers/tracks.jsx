import {GET_TRACKS, GET_ALBUM_TRACKS, POST_TRACKS} from '../constants/ActionTypes';

const initialState = {
   allTracks: [],
   albumTracks: []
};

export default function tracks(state = initialState, action) {
   switch (action.type){
      case GET_TRACKS:
         const allTracks = action.tracks;
         return {...state, allTracks};
      case GET_ALBUM_TRACKS:
         const albumTracks = action.tracks;
         return {...state, albumTracks};
      case POST_TRACKS:
         return state;
      default:
         return state;
   }
}
