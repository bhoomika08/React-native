import {combineReducers} from 'redux';

//---------- REDUCERS ----------//
import counter from './counter';
import user from './user';
import library from "./library";

const appReducer = combineReducers({
  counter,
  user,
  library
});

export default appReducer;
