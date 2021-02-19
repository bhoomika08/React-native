import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Icons} from 'constants/icons';
import {Spacing, Global, Typography, Colors} from 'stylesheets';

const {rowFlex, flex1, verticalCenter, horizontalCenter, spaceBetween} = Global;
const {gochiFont, comicFont, iconFont, fs20, fs26, bold} = Typography;
const {p20, px20, py10, mr20, mb10, mb20} = Spacing;
const {blue, grey, red, yellow} = Colors;
const {search, previous, next, htmlCaretDown} = Icons;

const Main = () => {
  const {
    mainContainer,
    headerContainer,
    header,
    heading,
    navigation,
    navigationLabel,
    innerContainer,
    sectionContainer,
    sectionTitle,
    sectionDescription,
    highlight,
    icon,
    searchIcon,
    downCaretIcon,
  } = styles;
  return (
    <View style={mainContainer}>
      <View style={headerContainer}>
        <View style={header}>
          <Text style={heading}>REACT NATIVE</Text>
        </View>
        <View style={verticalCenter}>
          <Text style={[icon, searchIcon]}>{search}</Text>
        </View>
      </View>
      <View style={navigation}>
        <Text style={icon}>{previous}</Text>
        <Text style={navigationLabel}>Home</Text>
        <Text style={icon}>{next}</Text>
      </View>
      <View style={innerContainer}>
        <View style={sectionContainer}>
          <Text style={sectionTitle}>Step One</Text>
          <Text style={sectionDescription}>
            Edit <Text style={highlight}>App.js</Text> to change this screen and
            then come back to see your edits.
          </Text>
        </View>
        <View style={sectionContainer}>
          <Text style={sectionTitle}>See Your Changes</Text>
          <Text style={sectionDescription}>
            Press <Text style={highlight}>Cmd + R</Text> in the simulator to
            reload your app's code.
          </Text>
        </View>
        <View style={sectionContainer}>
          <Text style={sectionTitle}>Debug</Text>
          <Text style={sectionDescription}>
            Press <Text style={highlight}>Cmd + D</Text> in the simulator or
            shake your device to open the React Native debug menu.
          </Text>
        </View>
        <View style={sectionContainer}>
          <Text style={sectionTitle}>
            Learn More <Text style={[downCaretIcon]}>{htmlCaretDown}</Text>
          </Text>
          <Text style={sectionDescription}>
            Read the docs to discover what to do next.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: getStatusBarHeight(),
  },
  icon: {
    ...iconFont,
  },
  searchIcon: {
    ...fs20,
    color: grey,
    ...mr20,
  },
  downCaretIcon: {
    ...fs20,
    color: grey,
  },
  headerContainer: {
    ...rowFlex,
    backgroundColor: yellow,
  },
  heading: {
    ...comicFont,
    ...fs26,
    ...py10,
  },
  header: {
    ...flex1,
    ...horizontalCenter,
  },
  navigation: {
    ...rowFlex,
    ...spaceBetween,
    ...p20,
  },
  navigationLabel: {
    ...fs20,
    ...bold,
  },
  innerContainer: {
    ...px20,
  },
  sectionContainer: {
    ...mb20,
  },
  sectionTitle: {
    ...fs26,
    color: blue,
    ...comicFont,
    ...mb10,
  },
  sectionDescription: {
    ...fs20,
    ...gochiFont,
  },
  highlight: {
    color: red,
  },
});

export default Main;
