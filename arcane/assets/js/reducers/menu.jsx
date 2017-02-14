import { GET_MENU_ITEMS } from '../actions/ActionTypes';

const initialState = [];

export default function menu(state = initialState, action) {
   switch (action.type){
      case GET_MENU_ITEMS:
         return [
            {
               name: "Upload",
               icon: "music_note"
            }, ...state];

      default:
         return state;
   }
}
