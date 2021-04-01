import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {libraryForm} from 'constants/app-defaults';

const {horizontalCenter} = Global;
const {gochiFont, comicFont, fs18, fs20, fs25, bold} = Typography;
const {py20, p20, mb5, mb20, mtAuto} = Spacing;
const {grey, darkBlue, lightGreen, white, maroon} = Colors;

const ShowBook = ({route, navigation}) => {
  const {book} = route.params.params || {};
  const {name, author, publisher, price} = book;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${name} Details`,
      headerBackTitle: "Back"
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
      <View style={p20}>
        <View style={bookDetails}>
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
          <View>
            <Text style={label}>
              Price: <Text style={details}>{price}</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={mtAuto}>
        <Pressable
          style={[button, {backgroundColor: lightGreen}]}
          onPress={navigateToForm}>
          <Text style={[fs20, bold]}>EDIT</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = {
  innerContainer: {
    flex: 1,
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
