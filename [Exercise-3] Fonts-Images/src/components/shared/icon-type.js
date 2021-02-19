import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Spacing, Global, Typography, Colors} from 'stylesheets';

const {rowFlex, spaceBetween} = Global;
const {mb10} = Spacing;
const {iconFont, fs20, fs24, gochiFont} = Typography;
const {grey} = Colors;

export const IconType = ({idx, name, iconType, nameStyle, iconStyle}) => {
  const {icon, iconDescription} = styles;
  return (
    <View style={[rowFlex, spaceBetween, mb10]}>
      <Text style={[iconDescription, nameStyle]}>{`${idx}. ${name}`}</Text>
      <Text style={[icon, iconStyle]}>{iconType}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconDescription: {
    flex: 0.6,
    ...fs24,
    ...gochiFont,
  },
  icon: {
    flex: 0.3,
    ...iconFont,
    ...fs20,
    color: grey,
  },
});
