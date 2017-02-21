import {GET_ALBUMS} from '../constants/ActionTypes';

const initialState = {};

export default function albums(state = initialState, action) {
   switch (action.type){
      case GET_ALBUMS:
         return { ...action.albums};
      default:
         return state;
   }
}
