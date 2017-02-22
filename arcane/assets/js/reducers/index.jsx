
import { combineReducers } from 'redux';
import genres from './genres';
import tracks from './tracks';
import artists from './artists';
import albums from './albums';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    genres,
    tracks,
    artists,
    albums,
    routing: routerReducer
});

export default rootReducer;
