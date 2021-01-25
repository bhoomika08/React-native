import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store from 'store';
import { persistor } from './store';
import Counter from 'components/counter';
import InputName from 'components/inputName';
import {Global} from 'stylesheets';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          <InputName />
          <Counter />
        </View>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Global.horizontalCenter,
    ...Global.verticalCenter,
  },
});

export default App;
