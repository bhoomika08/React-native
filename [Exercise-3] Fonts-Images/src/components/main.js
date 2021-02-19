import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Spacing, Global, Typography, Colors} from 'stylesheets';
import {icons} from 'constants/icon-data';
import {IconType} from 'components/shared/icon-type';

const {verticalCenter, horizontalCenter} = Global;
const {gochiFont, comicFont, fs20, fs26, bold} = Typography;
const {p20, py10, mb10, mb20} = Spacing;
const {blue, green, purple, red, yellow} = Colors;

const Main = () => {
  const {
    mainContainer,
    headerContainer,
    heading,
    innerContainer,
    sectionContainer,
    sectionTitle,
    sectionDescription,
    iconTitle,
    highlight,
  } = styles;
  return (
    <View style={mainContainer}>
      <View style={headerContainer}>
        <Text style={heading}>REACT NATIVE FONTS</Text>
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
        <View>
          <Text style={[sectionTitle, iconTitle]}>ICONS</Text>
          {Object.values(icons).map(({name, value}, idx) => (
            <IconType key={value} idx={idx + 1} name={name} iconType={value} />
          ))}
        </View>
        <View style={verticalCenter}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: getStatusBarHeight(),
  },
  headerContainer: {
    backgroundColor: yellow,
    ...horizontalCenter,
  },
  heading: {
    ...comicFont,
    ...fs26,
    ...py10,
    color: purple,
  },
  innerContainer: {
    ...p20,
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
  iconTitle: {
    color: green,
    ...bold,
  },
  highlight: {
    color: red,
  },
});

export default Main;
