import React from 'react';
import {View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {flex1} from 'stylesheets/global';
import TranslationAnimation from "components/translation-animation";
import PulsatingAnimation from "components/pulsating-animation";

const isIOSPlatform = Platform.OS == 'ios';

const App = () => {
  const {mainContainer} = styles;
  return (
    <View style={mainContainer}>
      <TranslationAnimation />
      <PulsatingAnimation />
    </View>
  );
};

const styles = {
  mainContainer: {
    marginTop: isIOSPlatform ? getStatusBarHeight() : 0,
    ...flex1,
  },
};

export default App;
