import {GET_ALBUMS, GET_ARTIST_ALBUMS} from '../constants/ActionTypes';

const initialState = {
   allAlbums: [],
   artistAlbums: []
};
export default function albums(state = initialState, action) {
   switch (action.type){
     case GET_ALBUMS:
        const allAlbums = action.albums;
        return {...state, allAlbums};
     case GET_ARTIST_ALBUMS:
        const artistAlbums = action.albums;
        return {...state, artistAlbums};
      default:
         return state;
   }
};
