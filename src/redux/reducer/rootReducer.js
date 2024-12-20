import { combineReducers } from 'redux';
import appReducer from './appReducer';
import musicReducer from './musicReducer';

const rootReducer = combineReducers({
    app: appReducer,
    music: musicReducer,
});

export default rootReducer;