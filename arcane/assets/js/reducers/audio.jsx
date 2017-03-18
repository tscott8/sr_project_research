/**********************************************************
 * Src: https://github.com/jslauthor/react-audio-component
 **********************************************************/
 import {
   INITIALIZE, ERROR,
   UPDATE_VOLUME, NEXT, PREVIOUS,
   PLAY, SET_TIME, SET_PROGRESS,
   TOGGLE_FAVORITE, TOGGLE_REPEAT,
   UPDATE_POSITION, PAUSE, TOGGLE_LOOP,
   TOGGLE_SHUFFLE, ADD_TO_QUEUE
 } from '../constants/ActionTypes'

 import find from 'lodash/find';
 import findIndex from 'lodash/findIndex';
 import sortBy from 'lodash/sortBy';
 import indexOf from 'lodash/indexOf';
 import clone from 'lodash/clone';

 const initialState = {
   isPlaying: false,
   isFavorite: false,
   isRepeating: false,
   isLooping: false,
   isShuffling: true,
   percent: 0,
   volume: 65,
   progress: {},
   duration: 0,
   repeat: false,
   songs: [],
   completedsongs: [],
   currentID: null,
   defaultSong: {
     "id": -1,
     "album": "",
     "url": "http://localhost:8000/static/default.mp3",
     "name": "Waiting...",
     "artist": "No song loaded",
     "favorite": false
   }
 };
 function getSongIndex(songs, id) {
   return findIndex(songs, (o) => o.id === id);
 }

 function getAdjacentSong(songs, startIndex, direction) {
    // console.info(songs);
   let nextIndex = startIndex + direction;
   nextIndex = nextIndex < 0 ? songs.length-1 : nextIndex > songs.length-1 ? 0 : nextIndex;
  //  let complete = songs.shift();

  //  console.log(complete);
   return songs[nextIndex].id;
 }

function getAudioState(audio) {
   var test = {
     isPlaying: !audio.paused,
     percent: audio.currentTime / audio.duration,
     progress: audio.buffered,
     duration: audio.duration,
     isLooping: audio.loop,
     error: audio.error
   }

   return test;
 }

 function shuffle(array) {
    let saved = array.shift();
    let counter = array.length;
     // While there are elements in the array
     while (counter > 0) {
         // Pick a random index
         let index = Math.floor(Math.random() * counter);
         // Decrease counter by 1
         counter--;
         // And swap the last element with it
         let temp = array[counter];
         array[counter] = array[index];
         array[index] = temp;
     }
     array.unshift(saved)
     return array;
 }


 export default function audio(state = initialState, action) {
   switch (action.type) {
     case INITIALIZE:
       const songsArray = shuffle(action.songs);
      //  const songsArray = sortBy(action.songs, ['id']);
       return {...state, songs: songsArray, currentID: songsArray[0].id };
     case PLAY:
     case PAUSE:
     case ERROR:
       return {...state, ...getAudioState(action.audio) };
     case NEXT:
       return {
         ...state,
         currentID: getAdjacentSong(state.songs, getSongIndex(state.songs, state.currentID), 1),
         ...getAudioState(action.audio)
       };
     case PREVIOUS:
       return {
         ...state,
         currentID: getAdjacentSong(state.songs, getSongIndex(state.songs, state.currentID), -1),
         ...getAudioState(action.audio)
       };
     case UPDATE_VOLUME:
       return {...state, volume: action.volume };
     case SET_TIME:
       return {...state, ...getAudioState(action.audio) };
     case UPDATE_POSITION:
       return {...state, ...getAudioState(action.audio) };
     case SET_PROGRESS:
       return {...state, ...getAudioState(action.audio) };
     case TOGGLE_FAVORITE:
       const songs = state.songs.map(clone);
       const song = find(songs, {id: state.currentID});
       song.favorite = !song.favorite;
       return {...state, songs };
     case TOGGLE_REPEAT:
       return {...state, isRepeating: !state.isRepeating };
     case TOGGLE_LOOP:
       return {...state, ...getAudioState(action.audio) };
     case TOGGLE_SHUFFLE:
       return {...state, isShuffling: !state.isShuffling, songs: shuffle(state.songs.map(clone)) };
     case ADD_TO_QUEUE:
        let newSongs = state.songs.map(clone);
        newSongs = newSongs.concat(action.songs);
        console.info("IN audio ADD_TO_QUEUE", action.songs);
       return {...state, songs: newSongs };
     default:
       return state
   }
 }
