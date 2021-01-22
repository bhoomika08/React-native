import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from 'store';
import Counter from 'components/counter';
import InputName from 'components/inputName';
import {Global} from 'stylesheets';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <InputName />
        <Counter />
      </View>
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
