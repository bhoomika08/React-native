import React from 'react';
import {ScrollView, View, Text, Pressable} from 'react-native';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {libraryForm} from 'constants/navigators';
import CurrentLocation from 'components/current-location';
import BookDistance from 'components/book-distance';
import {CustomImage} from 'components/shared/common';

const {flex1, horizontalCenter} = Global;
const {gochiFont, comicFont, fs18, fs20, fs25, bold} = Typography;
const {py20, p20, mb5, mb20, mtAuto} = Spacing;
const {grey, darkBlue, lightGreen, white, maroon} = Colors;

const defaultObj = {};

const ShowBook = ({route, navigation}) => {
  const {book} = route.params || defaultObj;
  const {image, name, author, publisher, price, location} = book;
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

  return (
    <View style={innerContainer}>
      <CurrentLocation />
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
            <BookDistance
              labelStyle={label}
              valueStyle={details}
              location={location}
            />
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

export default ShowBook;
