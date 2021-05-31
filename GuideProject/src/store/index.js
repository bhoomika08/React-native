import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from '@reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = [].concat(ReduxThunk);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);

export default store;
