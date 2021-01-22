import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducers from 'store/reducers';

const middleware = [].concat(ReduxThunk);
const store = createStore(reducers, applyMiddleware(...middleware));

export default store;
