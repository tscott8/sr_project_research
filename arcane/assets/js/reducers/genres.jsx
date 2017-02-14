import { GET_GENRES } from '../actions/ActionTypes';

const initialState = [];

export default function genres(state = initialState, action) {
   switch (action.type){
      case GET_GENRES:
         return [
            {
               name: "Alternative",
               color: "#d40000",
               icon: "music_note"
            }, ...state];

      default:
         return state;
   }
}
