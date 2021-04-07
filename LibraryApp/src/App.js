import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store from 'store';
import {persistor} from './store';
import LibraryApp from 'components/library-app';
import SplashScreen from 'react-native-splash-screen';

const splashScreenTimeout = 5000;

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, splashScreenTimeout);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LibraryApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
