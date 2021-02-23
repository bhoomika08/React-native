import {StyleSheet} from 'react-native';

export const Global = StyleSheet.create({
  flex1: {
    flex: 0.45
  },
  rowFlex: {
    flexDirection: 'row',
  },
  columnFlex: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between'
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
  borderRadius5: {
    borderRadius: 5,
  },
  borderWidth1: {
    borderWidth: 1
  },
  borderBottomWidth1: {
    borderBottomWidth: 1
  }
});
