import React, {useState, useEffect} from 'react';
import {booksList} from 'constants/navigators';
import {alert} from 'helpers/application';
import {Text, Linking, Pressable} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {Typography} from 'stylesheets';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {cameraFlipAndroid, cameraFlipIos} from 'constants/icons';

const {iconFont, fs18, fs30, bold} = Typography;

const isIOSPlatform = Platform.OS == 'ios';

const QRTop = () => (
  <Text style={fs18}>
    Go to <Text style={bold}>wikipedia.org/wiki/QR_code</Text> on your computer
    and scan the QR code.
  </Text>
);

const QRCodeBottom = ({onPress}) => {
  const {cameraIcon} = styles;
  return (
    <Pressable onPress={onPress}>
      <Text style={cameraIcon}>
        {isIOSPlatform ? cameraFlipIos : cameraFlipAndroid}
      </Text>
    </Pressable>
  );
};

const ScanCode = (props) => {
  const [cameraType, setCameraType] = useState('back');
  useEffect(() => {
    const {navigation} = props;
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton label="Listing" onPress={navigateToListing} />
      ),
    });
  });

  cameraSwitch = () => {
    setCameraType(cameraType == 'back' ? 'front' : 'back');
  };

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
      cameraType={cameraType}
      flashMode={RNCamera.Constants.FlashMode.auto}
      topContent={<QRTop />}
      bottomContent={<QRCodeBottom onPress={cameraSwitch} />}
    />
  );
};

const styles = {
  cameraIcon: {
    ...iconFont,
    ...fs30,
  },
};

export default ScanCode;
