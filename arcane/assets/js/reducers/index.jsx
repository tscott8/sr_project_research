
import { combineReducers } from 'redux';
import genres from './genres';
import tracks from './tracks';
import artists from './artists';
import albums from './albums';

const rootReducer = combineReducers({
    genres,
    tracks,
    artists,
    albums
});

export default rootReducer;
