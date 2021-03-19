import React, {useEffect} from 'react';
import {Animated, Easing, View, Text} from 'react-native';
import {blue, lightBlue, pink} from 'stylesheets/colors';
import {flex1, horizontalCenter, center} from 'stylesheets/global';
import {py20} from 'stylesheets/spacing';
import {fs30, bold, uppercase} from 'stylesheets/typography';

const circleSize = 100;
const animDuration = 5000;
const minValue = 0.1;
const maxValue = 0.9;

const PulsatingAnim = () => {
  const fadeAnim = new Animated.Value(minValue);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: maxValue,
          duration: animDuration,
          easing: Easing.circle,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: minValue,
          duration: animDuration,
          easing: Easing.circle,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  const BackgroundColorConfig = fadeAnim.interpolate({
    inputRange: [minValue, maxValue],
    outputRange: [blue, pink],
  });

  const animatedStyle = {
    ...styles.circleShapeView,
    opacity: fadeAnim,
    backgroundColor: BackgroundColorConfig,
  };

  const {container, headerContainer, heading} = styles;
  return (
    <>
      <View style={headerContainer}>
        <Text style={heading}>PULSATING ANIMATION</Text>
      </View>
      <View style={container}>
        <Animated.View style={animatedStyle}></Animated.View>
      </View>
    </>
  );
};

const styles = {
  container: {
    ...flex1,
    ...center,
  },
  headerContainer: {
    ...horizontalCenter,
    backgroundColor: lightBlue,
    ...py20,
  },
  heading: {
    ...fs30,
    color: blue,
    ...bold,
    ...uppercase,
  },
  circleShapeView: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
  },
};

export default PulsatingAnim;
