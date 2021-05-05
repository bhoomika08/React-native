import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, View, Text, Pressable} from 'react-native';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {calculateDistance} from 'helpers/application';
import {libraryForm} from 'constants/navigators';
import {CustomImage} from 'components/shared/common';

const {flex1, horizontalCenter} = Global;
const {gochiFont, comicFont, fs18, fs20, fs25, bold} = Typography;
const {py20, p20, mb5, mb20, mtAuto} = Spacing;
const {grey, darkBlue, lightGreen, white, maroon} = Colors;

const defaultObj = {};

const ShowBook = ({route, navigation, currentLocation}) => {
  const {book} = route.params || defaultObj;
  const {image, name, author, publisher, price, location} = book;
  const {lat, long} = location || defaultObj;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${name} Details`,
      headerBackTitle: 'Back',
    });
  });
  const navigateToForm = () => navigation.navigate(libraryForm);

  const {
    innerContainer,
    bookDetails,
    label,
    listItemName,
    details,
    button,
  } = styles;

  const {lat: currentLatitude, long: currentLongitude} =
    currentLocation || defaultObj;
  const locations = {
    startLocation: {lat: currentLatitude, long: currentLongitude},
    endLocation: {lat, long},
  };
  const isValidDistance =
    Math.abs(currentLatitude) > 0 && Math.abs(currentLongitude) > 0;
  const distance = isValidDistance && calculateDistance(locations);
  return (
    <View style={innerContainer}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={p20}>
          <View style={bookDetails}>
            <View style={mb20}>
              <CustomImage image={image} />
            </View>
            <View style={mb20}>
              <Text style={label}>Name: </Text>
              <Text style={listItemName}>{name}</Text>
            </View>
            <View style={mb20}>
              <Text style={label}>Author: </Text>
              <Text style={details}>{author}</Text>
            </View>
            <View style={mb20}>
              <Text style={label}>Publisher: </Text>
              <Text style={details}>{publisher}</Text>
            </View>
            <View style={mb20}>
              <Text style={label}>
                Price: <Text style={details}>{price}</Text>
              </Text>
            </View>
            {distance >= 0 && (
              <View>
                <Text style={label}>Distance: </Text>
                <Text style={details}>{distance}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={mtAuto}>
        <Pressable style={button} onPress={navigateToForm}>
          <Text style={[fs20, bold]}>EDIT</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = {
  innerContainer: {
    ...flex1,
    backgroundColor: grey,
  },
  bookDetails: {
    ...p20,
    backgroundColor: white,
  },
  label: {
    ...mb5,
    ...fs18,
    ...bold,
    color: darkBlue,
  },
  listItemName: {
    ...comicFont,
    ...fs20,
    color: maroon,
  },
  details: {
    ...gochiFont,
    ...fs25,
    color: maroon,
  },
  button: {
    ...horizontalCenter,
    backgroundColor: lightGreen,
    ...py20,
  },
};

function mapStateToProps({library: {currentLocation}}) {
  return {
    currentLocation,
  };
}

export default connect(mapStateToProps)(ShowBook);
