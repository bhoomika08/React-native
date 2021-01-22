import { combineReducers } from "redux";

//---------- REDUCERS ----------//
import counter from "./counter";

const appReducer = combineReducers({
  counter
});

export default appReducer;
