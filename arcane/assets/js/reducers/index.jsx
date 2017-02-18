
import { combineReducers } from 'redux';
import genres from './genres';
import tracks from './tracks';

const rootReducer = combineReducers({
    genres,
    tracks
});

export default rootReducer;
