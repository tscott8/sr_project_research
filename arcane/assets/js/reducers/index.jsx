
import { combineReducers } from 'redux';
import genres from './genres';
import tracks from './tracks';
import artists from './artists';

const rootReducer = combineReducers({
    genres,
    tracks,
    artists
});

export default rootReducer;
