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

export const isSearchMatching = (str1, str2) => {
  if (typeof str1 == 'string' && typeof str2 == 'string') {
    return str1.toLowerCase().match(str2.toLowerCase());
  }
  return false;
};
