import {StyleSheet} from 'react-native';

const isIOSPlatform = Platform.OS == 'ios';

export const Typography = StyleSheet.create({
  comicFont: {
    fontFamily: "Comic Sans MS"
  },
  gochiFont: {
    fontFamily: "GochiHand-Regular"
  },
  iconFont: {
    fontFamily: "icomoon"
  },
  fs16: {
    fontSize: 16
  },
  fs18: {
    fontSize: 18,
  },
  fs20: {
    fontSize: 20,
  },
  fs25: {
    fontSize: 25
  },
  fs30: {
    fontSize: 30,
  },
  bold: {
    fontWeight: isIOSPlatform ? '500' : 'bold',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});
