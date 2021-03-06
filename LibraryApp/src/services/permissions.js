import {Platform} from 'react-native';
import {PERMISSIONS, request, openSettings} from 'react-native-permissions';

const CAMERA_PERMISSION = Platform.select({
  android: PERMISSIONS.ANDROID.CAMERA,
  ios: PERMISSIONS.IOS.CAMERA,
});

const ANDROID_STORAGE_PERMISSION = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
const IOS_PHOTO_LIB_PERMISSION = PERMISSIONS.IOS.PHOTO_LIBRARY;
const LOCATION_PERMISSION = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

const PermissionService = {
  requestCameraPermission: () => {
    return request(CAMERA_PERMISSION).then((status) => status);
  },
  requestAndroidStoragePermission: () => {
    return request(ANDROID_STORAGE_PERMISSION).then((status) => status);
  },
  requestIosPhotoLibPermission: () => {
    return request(IOS_PHOTO_LIB_PERMISSION).then((status) => status);
  },
  requestAndroidLocation: () => {
    return request(LOCATION_PERMISSION).then((status) => status);
  },
  openAppSettings: () => openSettings(),
};

export default PermissionService;
