import React, {useEffect} from 'react';
import {Animated, Easing, View, Text} from 'react-native';
import {blue, lightBlue, pink} from 'stylesheets/colors';
import {flex1, horizontalCenter, center} from 'stylesheets/global';
import {py20} from 'stylesheets/spacing';
import {fs30, bold, uppercase} from 'stylesheets/typography';

const circleSize = 20;
const animDuration = 3000;
const delay = 2000;
const initX = 0;
const initY = 0;
const pathPositions = [
  {x: 0, y: 50},
  {x: 50, y: 50},
  {x: 50, y: 0},
  {x: -50, y: 50},
  {x: -50, y: 0},
  {x: -50, y: -50},
  {x: 0, y: -50},
  {x: 50, y: -50},
  {x: 50, y: 0},
  {x: 0, y: 0},
];

const TranslationAnim = () => {
  const fadeAnim = new Animated.ValueXY({x: initX, y: initY});
  const animatedPath = pathPositions.map((position) => {
    return Animated.timing(fadeAnim, {
      toValue: position,
      delay,
      duration: animDuration,
      easing: Easing.linear,
      useNativeDriver: false,
    });
  });

  useEffect(() => {
    Animated.loop(Animated.sequence(animatedPath)).start();
  }, [fadeAnim]);

  const animatedStyle = {
    ...styles.circleShapeView,
    ...fadeAnim.getLayout(),
  };

  const { container, headerContainer, heading} = styles;
  return (
    <>
      <View style={headerContainer}>
        <Text style={heading}>TRANSLATION ANIMATION</Text>
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
    backgroundColor: pink,
  },
};

export default TranslationAnim;
