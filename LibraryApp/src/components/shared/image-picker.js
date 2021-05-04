import React from 'react';
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import PermissionService from 'services/permissions';
import {Label} from 'components/shared/form-controls';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {cameraBlack, imageBlack} from 'constants/icons';

const {
  rowFlex,
  flexEnd,
  columnFlex,
  spaceBetween,
  verticalCenter,
  borderWidth1,
} = Global;
const {iconFont, fs20} = Typography;
const {px10, mb20} = Spacing;
const {darkGrey, white} = Colors;

const isIOSPlatform = Platform.OS == 'ios';

const options = {
  cameraLaunch: {
    cameraType: 'back',
    allowsEditing: true,
    maxWidth: 300,
    maxHeight: 400,
    saveToPhotos: true,
  },
  imageGalleryLaunch: {
    maxWidth: 300,
    maxHeight: 400,
  },
};

class ImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: {},
    };
  }

  // ------- request Camera Permission for both android & ios ----------- //
  requestCameraPermission = () =>
    PermissionService.requestCameraPermission().then((result) => {
      if (result == 'granted') {
        return true;
      }
      return false;
    });

  // ------------ request Write Permission to store captured image to device in android --------- //
  requestAndroidStoragePermission = () =>
    PermissionService.requestAndroidStoragePermission().then((result) => {
      if (result == 'granted') {
        return true;
      }
      return false;
    });

  // ----------- request Photo Library permission in ios --------- //
  requestPhotoLibPermission = () =>
    PermissionService.requestIosPhotoLibPermission().then((result) => {
      if (result == 'granted') {
        return true;
      }
      return false;
    });

  // -------- Launch Camera ---------- //
  openCamera = async () => {
    const isCameraPermitted = await this.requestCameraPermission();
    const isStoragePermitted = await this.requestAndroidStoragePermission();
    if (isCameraPermitted && isStoragePermitted) {
      this.cameraLaunch();
    }
  };

  cameraLaunch() {
    const {onImageSelect} = this.props;
    launchCamera(options.cameraLaunch, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        console.log('response', JSON.stringify(res));
        this.setState({
          imagePath: res,
        });
        onImageSelect(res.uri);
      }
    });
  }

  // -------- Launch Device Gallery -------------- //
  openImageGallery = async () => {
    const isPhotoLibPermitted = isIOSPlatform
      ? await this.requestPhotoLibPermission()
      : await this.requestAndroidStoragePermission();
    if (isPhotoLibPermitted) {
      this.imageGalleryLaunch();
    }
  };

  imageGalleryLaunch = () => {
    const {onImageSelect} = this.props;
    launchImageLibrary(options.imageGalleryLaunch, (res) => {
      console.log('launchImageLibrary Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        this.setState({
          imagePath: res,
        });
        onImageSelect(res.uri);
      }
    });
  };

  render() {
    const {imagePath} = this.state;
    const {image} = this.props;
    const {uri} = imagePath;
    const {icon, imageStyle} = styles;
    const imageUri = image || uri;
    return (
      <View style={[columnFlex, spaceBetween, mb20]}>
        <View style={[rowFlex, spaceBetween]}>
          <Label label="Select Book Image" />
          <View style={[rowFlex, flexEnd]}>
            <Pressable style={verticalCenter} onPress={this.openCamera}>
              <Text style={icon}>{cameraBlack}</Text>
            </Pressable>
            <Pressable style={verticalCenter} onPress={this.openImageGallery}>
              <Text style={icon}>{imageBlack}</Text>
            </Pressable>
          </View>
        </View>
        <Image source={{uri: imageUri}} style={imageStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    ...iconFont,
    ...fs20,
    ...px10,
  },
  imageStyle: {
    width: 200,
    height: 200,
    ...borderWidth1,
    borderColor: darkGrey,
    backgroundColor: white,
  },
});

export default ImagePicker;
