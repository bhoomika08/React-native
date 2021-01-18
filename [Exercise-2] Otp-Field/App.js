import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import OtpInputs from './src/components/OtpInputs';
import {Typography, Global, Colors, Spacing} from './src/styles';

const inputs = Array(6).fill();

const createAlert = (title, message) =>
  Alert.alert(`${title}`, `${message}`, [{text: 'OK'}], {cancelable: true});

const App = () => {
  const getOtp = (otp) => {
    createAlert('OTP Entered', otp);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter OTP</Text>
      <OtpInputs getOtp={getOtp} inputs={inputs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Global.centerAlign,
  },
  header: {
    ...Typography.fs25,
    color: Colors.blue,
    ...Spacing.mb10,
  },
});

export default App;
