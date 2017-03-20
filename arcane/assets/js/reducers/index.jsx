
import { combineReducers } from 'redux';
import genres from './genres';
import tracks from './tracks';
import artists from './artists';
import albums from './albums';
import audio from './audio';
import profile from './profile';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    genres,
    tracks,
    artists,
    albums,
    audio,
    profile,
    routing: routerReducer,
});

export default rootReducer;
