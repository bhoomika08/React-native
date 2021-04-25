import React, {useEffect} from 'react';
import {booksList} from 'constants/navigators';
import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {alert} from 'helpers/application';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const ScanCode = (props) => {
  useEffect(() => {
    const {navigation} = props;
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton label="Listing" onPress={navigateToListing} />
      ),
    });
  });

  onSuccess = (e) => {
    Linking.openURL(e.data).catch((err) => alert('Error', err.message));
  };

  navigateToListing = () => {
    const {navigation} = props;
    navigation.navigate(booksList);
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker={true}
      flashMode={RNCamera.Constants.FlashMode.auto}
      topContent={
        <Text style={styles.centerText}>
          Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
          on your computer and scan the QR code.
        </Text>
      }
      bottomContent={
        <TouchableOpacity
          onPress={navigateToListing}
          style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default ScanCode;
