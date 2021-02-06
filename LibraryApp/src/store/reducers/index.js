import {combineReducers} from 'redux';

//---------- REDUCERS ----------//
import counter from './counter';
import user from './user';

const appReducer = combineReducers({
  counter,
  user
});

export default appReducer;
