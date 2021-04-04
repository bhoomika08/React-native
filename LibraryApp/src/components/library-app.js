import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Colors} from 'stylesheets';
import AuthNavigators from 'components/navigators/auth-navigators';

const {grey} = Colors;
const isIOSPlatform = Platform.OS == 'ios';

const LibraryApp = () => {
  const {innerContainer} = styles;
  return (
    <KeyboardAvoidingView
      style={innerContainer}
      behavior={isIOSPlatform ? 'padding' : null}
      keyboardVerticalOffset={0}>
      <AuthNavigators />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: grey,
  },
});

export default LibraryApp;
