import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store from 'store';
import {persistor} from './store';
import Form from 'components/form';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Form />
      </PersistGate>
    </Provider>
  );
};

export default App;
