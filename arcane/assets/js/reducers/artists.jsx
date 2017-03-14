import {GET_ARTISTS, GET_GENRE_ARTISTS} from '../constants/ActionTypes';

const initialState = {
   allArtists: [],
   genreArtists: []
};
export default function artists(state = initialState, action) {
   switch (action.type){
      case GET_ARTISTS:
        const allArtists = action.artists;
         return { ...state, allArtists};
      case GET_GENRE_ARTISTS:
         const genreArtists = action.artists;
         return {...state, genreArtists};
      default:
         return state;
   }
}
