import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { View, Text } from "react-native";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "@store";
import SplashScreen from "react-native-splash-screen";

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
        <View>
          <Text>Hello Snackery App</Text>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
