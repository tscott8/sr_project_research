import {GET_ARTISTS} from '../constants/ActionTypes';

const initialState = [];

export default function artists(state = initialState, action) {
   switch (action.type){
      case GET_ARTISTS:
         return { ...action.artists};
      default:
         return state;
   }
}
