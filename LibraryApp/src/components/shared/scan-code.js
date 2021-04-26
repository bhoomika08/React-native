import React, {useState, useEffect} from 'react';
import {booksList} from 'constants/navigators';
import {alert} from 'helpers/application';
import {Text, Linking, Pressable} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {Global, Typography, Spacing, Colors} from 'stylesheets';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {cameraFlipAndroid, cameraFlipIos} from 'constants/icons';

const {flex1, absolutePosition} = Global;
const {iconFont, fs18, fs30, bold} = Typography;
const {p20} = Spacing;
const {white} = Colors;

const isIOSPlatform = Platform.OS == 'ios';

const QRTop = () => {
  const {topViewText} = styles;
  return (
    <Text style={topViewText}>
      Go to <Text style={bold}>wikipedia.org/wiki/QR_code</Text> on your
      computer and scan the QR code.
    </Text>
  );
};

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

  const {scannerContainer, qrTopViewStyle, qrBottomViewStyle} = styles;
  return (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker={true}
      cameraType={cameraType}
      cameraStyle={scannerContainer}
      flashMode={RNCamera.Constants.FlashMode.auto}
      topContent={<QRTop />}
      topViewStyle={qrTopViewStyle}
      bottomContent={<QRCodeBottom onPress={cameraSwitch} />}
      bottomViewStyle={qrBottomViewStyle}
    />
  );
};

const styles = {
  scannerContainer: {
    height: '100%',
  },
  topViewText: {
    ...fs18,
    ...flex1,
    color: white,
  },
  cameraIcon: {
    ...iconFont,
    ...fs30,
    color: white,
  },
  qrTopViewStyle: {
    ...absolutePosition,
    top: 40,
    zIndex: 50,
    ...p20,
  },
  qrBottomViewStyle: {
    ...absolutePosition,
    zIndex: 50,
    bottom: 40,
  },
};

export default ScanCode;
