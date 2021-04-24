import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {Label} from 'components/shared/form-controls';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {cameraBlack, imageBlack} from 'constants/icons';

const {rowFlex, flexEnd, columnFlex, spaceBetween, verticalCenter} = Global;
const {iconFont, fs20} = Typography;
const {px10, mb20} = Spacing;
const {darkGrey, white} = Colors;

class ImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
    };
  }

  // ------- request Camera Permission ----------- //
  requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // ----- If CAMERA Permission is granted ------- //
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  // ------------ request Write Permission to Store Captured Image to Device --------- //
  requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // -------- If WRITE_EXTERNAL_STORAGE Permission is granted --------- //
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  // -------- Launch Camera ---------- //
  cameraLaunch = async () => {
    const {onImageSelect} = this.props;
    let options = {
      title: 'Select Avatar',
      cameraType: 'back',
      allowsEditing: true,
      maxWidth: 300,
      maxHeight: 400,
      saveToPhotos: true,
    };
    let isCameraPermitted = await this.requestCameraPermission();
    let isStoragePermitted = await this.requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (res) => {
        console.log('launchCamera Response = ', res);

        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          console.log('response', JSON.stringify(res));
          this.setState({
            resourcePath: res,
          });
          onImageSelect(res.uri);
        }
      });
    }
  };

  // -------- Launch Device Gallery -------------- //
  imageGalleryLaunch = () => {
    const {onImageSelect} = this.props;
    let options = {
      maxWidth: 300,
      maxHeight: 400,
    };

    launchImageLibrary(options, (res) => {
      console.log('launchImageLibrary Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        console.log('response', JSON.stringify(res));
        this.setState({
          resourcePath: res,
        });
        onImageSelect(res.uri);
      }
    });
  };

  render() {
    const {resourcePath} = this.state;
    const {image} = this.props;
    const {uri} = resourcePath;
    const {icon, imageStyle} = styles;
    const imagePath = image || uri;
    return (
      <View style={[columnFlex, spaceBetween, mb20]}>
        <View style={[rowFlex, spaceBetween]}>
          <Label label="Select Book Image" />
          <View style={[rowFlex, flexEnd]}>
            <Pressable style={verticalCenter} onPress={this.cameraLaunch}>
              <Text style={icon}>{cameraBlack}</Text>
            </Pressable>
            <Pressable style={verticalCenter} onPress={this.imageGalleryLaunch}>
              <Text style={icon}>{imageBlack}</Text>
            </Pressable>
          </View>
        </View>
        <Image source={{uri: imagePath}} style={imageStyle} />
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
    borderWidth: 1,
    borderColor: darkGrey,
    backgroundColor: white,
  },
});

export default ImagePicker;
