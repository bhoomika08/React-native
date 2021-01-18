import React from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import OtpInputs from "./Components/OtpInputs";

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
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    color: 'blue',
    marginBottom: 10
  },
});

export default App;
