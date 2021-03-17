import React from 'react';
import {View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {flex1} from 'stylesheets/global';
import TranslationAnim from "components/translation-animation";

const isIOSPlatform = Platform.OS == 'ios';

const App = () => {
  const {mainContainer} = styles;
  return (
    <View style={mainContainer}>
      <TranslationAnim />
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