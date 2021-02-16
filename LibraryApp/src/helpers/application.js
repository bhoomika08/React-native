import {Alert} from 'react-native';
export const omit = (keysToOmit, originalObj = {}) =>
  Object.fromEntries(
    Object.entries(originalObj).filter(([key]) => !keysToOmit.includes(key)),
  );

export const stringifyResponse = (response = []) =>
  `${Object.keys(response)
    .map((key) => `${key}: ${response[key]}`)
    .join('\n')}`;

export const alert = (title, message) =>
  Alert.alert(title, message, [{text: 'OK'}], {
    cancelable: true,
  });
