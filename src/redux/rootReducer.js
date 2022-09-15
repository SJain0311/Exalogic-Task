import { combineReducers } from 'redux';
import apiReducer from './reducer/apiReducer';

const rootReducer = combineReducers({
    assignment: apiReducer
});

export default rootReducer;