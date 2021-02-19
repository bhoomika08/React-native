import {Alert} from 'react-native';
export const omit = (keyToOmit, originalObj) => {
  delete originalObj[keyToOmit];
  return originalObj;
};

export const stringifyResponse = (response = []) =>
  `${Object.keys(response)
    .map((key) => `${key}: ${response[key]}`)
    .join('\n')}`;

export const alert = (title, message) =>
  Alert.alert(title, message, [{text: 'OK'}], {
    cancelable: true,
  });
