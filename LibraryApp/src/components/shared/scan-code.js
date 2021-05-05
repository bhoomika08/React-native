import React, {useState, useEffect} from 'react';
import {alert} from 'helpers/application';
import {View, Text, Linking, Pressable} from 'react-native';
import {Global, Typography, Spacing, Colors} from 'stylesheets';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import PermissionService from 'services/permissions';
import {cameraFlipAndroid, cameraFlipIos} from 'constants/icons';

const {
  rowFlex,
  flex1,
  spaceBetween,
  absolutePosition,
  borderRadius5,
  selfCenter,
  center,
} = Global;
const {iconFont, fs18, fs30, bold} = Typography;
const {p20, p15, mb20} = Spacing;
const {white, black} = Colors;

const isIOSPlatform = Platform.OS == 'ios';

const QRTop = () => {
  const {textStyle} = styles;
  return (
    <Text style={textStyle}>
      Go to <Text style={bold}>wikipedia.org/wiki/QR_code</Text> on your
      computer and scan the QR code.
    </Text>
  );
};

const QRCodeBottom = ({onCameraPress, onCancel}) => {
  const {cameraIcon, textStyle} = styles;
  return (
    <>
      <Pressable style={flex1} onPress={onCancel}>
        <Text style={textStyle}>CANCEL</Text>
      </Pressable>
      <Pressable onPress={onCameraPress}>
        <Text style={cameraIcon}>
          {isIOSPlatform ? cameraFlipIos : cameraFlipAndroid}
        </Text>
      </Pressable>
    </>
  );
};

const NoCameraPermissionView = () => {
  const {textStyle, noPermissionViewStyle, settingsButton} = styles;
  return (
    <View style={noPermissionViewStyle}>
      <Text style={mb20}>Please Enable Camera Permission from settings.</Text>
      <Pressable
        style={settingsButton}
        onPress={() => PermissionService.openAppSettings()}>
        <Text style={textStyle}>OPEN SETTINGS</Text>
      </Pressable>
    </View>
  );
};

const ScanCode = (props) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [cameraType, setCameraType] = useState('back');

  useEffect(() => {
    PermissionService.requestCameraPermission().then((result) => {
      if (result == 'granted') {
        setCameraPermission(true);
      }
    });
  });

  const cameraSwitch = () => {
    setCameraType(cameraType == 'back' ? 'front' : 'back');
  };

  const onSuccess = (e) => {
    Linking.openURL(e.data).catch((err) => alert('Error', err.message));
  };

  const cancelScanner = () => {
    const {navigation} = props;
    navigation.goBack();
  };

  const {scannerContainer, qrTopViewStyle, qrBottomViewStyle} = styles;
  return !isIOSPlatform && !cameraPermission ? (
    <NoCameraPermissionView />
  ) : (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker={true}
      cameraType={cameraType}
      cameraStyle={scannerContainer}
      flashMode={RNCamera.Constants.FlashMode.auto}
      notAuthorizedView={<NoCameraPermissionView />}
      topContent={<QRTop />}
      topViewStyle={qrTopViewStyle}
      bottomContent={
        <QRCodeBottom onCameraPress={cameraSwitch} onCancel={cancelScanner} />
      }
      bottomViewStyle={qrBottomViewStyle}
    />
  );
};

const styles = {
  scannerContainer: {
    height: '100%',
  },
  textStyle: {
    ...fs18,
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
    ...rowFlex,
    ...selfCenter,
    ...spaceBetween,
    width: '60%',
  },
  noPermissionViewStyle: {
    ...absolutePosition,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...center,
    zIndex: 99999,
    backgroundColor: white,
  },
  settingsButton: {
    backgroundColor: black,
    ...borderRadius5,
    ...p15,
  },
};

export default ScanCode;
