import {StyleSheet} from 'react-native';

export const Global = StyleSheet.create({
  flex1: {
    flex: 1
  },
  rowFlex: {
    flexDirection: 'row',
  },
  columnFlex: {
    flexDirection: 'column',
  },
  evenlySpaced: {
    alignContent: 'stretch',
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  horizontalCenter: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  borderRadius5: {
    borderRadius: 5,
  },
});
