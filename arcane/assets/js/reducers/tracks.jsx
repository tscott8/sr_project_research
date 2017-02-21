import {GET_TRACKS} from '../constants/ActionTypes';

const initialState = {};

export default function tracks(state = initialState, action) {
   switch (action.type){
      case GET_TRACKS:
         return { ...action.tracks};
      default:
         return state;
   }
}
