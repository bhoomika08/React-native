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

export const calculateDistance = ({startLocation = {}, endLocation = {}}) => {
  const {startLat, startLong} = startLocation;
  const {endLat, endLong} = endLocation;
  let dist;
  if (startLat == endLat && startLong == endLong) {
    dist = 0;
  } else {
    const radStartLat = (Math.PI * startLat) / 180;
    const radEndLat = (Math.PI * endLat) / 180;
    const theta = startLong - endLong;
    const radTheta = (Math.PI * theta) / 180;
    dist =
      Math.sin(radStartLat) * Math.sin(radEndLat) +
      Math.cos(radStartLat) * Math.cos(radEndLat) * Math.cos(radTheta);

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344 * 1000;
  }
  return `${dist.toFixed(2)} Meters`;
};
