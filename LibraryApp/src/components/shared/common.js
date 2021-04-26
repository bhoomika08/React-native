import React from 'react';
import {View, Text, Image} from 'react-native';
import {Colors, Global} from 'stylesheets';

const {verticalCenter, textCenter, borderWidth1} = Global;
const {darkGrey} = Colors;

export const CustomImage = ({image}) => {
  const {imageStyle} = styles;
  return image ? (
    <Image source={{uri: image}} style={imageStyle} />
  ) : (
    <View style={[imageStyle, verticalCenter]}>
      <Text style={textCenter}>No Image Available</Text>
    </View>
  );
};

const styles = {
  imageStyle: {
    width: 100,
    height: 100,
    ...borderWidth1,
    borderColor: darkGrey,
  },
};
