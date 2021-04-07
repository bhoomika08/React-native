import {BackHandler} from 'react-native';

export const addHardwareBackAction = (action) => {
  BackHandler.addEventListener('hardwareBackPress', action);
};

export const removeHardwareBackAction = (action) => {
  BackHandler.removeEventListener('hardwareBackPress', action);
};
