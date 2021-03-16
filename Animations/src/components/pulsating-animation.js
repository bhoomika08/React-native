import React, {useEffect} from 'react';
import {Animated, Easing, View} from 'react-native';
import {blue, pink} from 'stylesheets/colors';
import {flex1, center, borderRadius50} from 'stylesheets/global';

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

  const {container} = styles;
  return (
    <View style={container}>
      <Animated.View style={animatedStyle}></Animated.View>
    </View>
  );
};

const styles = {
  container: {
    ...flex1,
    ...center,
  },
  circleShapeView: {
    width: 100,
    height: 100,
    ...borderRadius50,
  },
};

export default PulsatingAnim;
