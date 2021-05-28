import React from 'react';
import {Animated, View, Text, PanResponder} from 'react-native';
import {blue, lightBlue, lightGreen, pink} from 'stylesheets/colors';
import {
  flex1,
  horizontalCenter,
  center,
  absolutePosition,
} from 'stylesheets/global';
import {py20} from 'stylesheets/spacing';
import {fs30, bold, uppercase, textCenter} from 'stylesheets/typography';

const squareSize = 200;
const minValue = 0;

class FlippingAnim extends React.Component {
  constructor() {
    super();
    this.flip = new Animated.Value(minValue);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: (e, {vx, dx}) => {
        if (dx > 0) {
          Animated.spring(this.flip, {
            toValue: 0,
            friction: 10,
            tension: 10,
            useNativeDriver: false,
          }).start();
        } else if (dx < 0) {
          Animated.spring(this.flip, {
            toValue: 180,
            friction: 10,
            tension: 10,
            useNativeDriver: false,
          }).start();
        }
      },
    });

    this.leftFlipInterpolate = this.flip.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    this.rightFlipInterpolate = this.flip.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  render() {
    const {
      container,
      headerContainer,
      heading,
      flipCard,
      flipCardBack,
      flipCardText,
    } = styles;

    const frontFlipStyle = {
      ...flipCard,
      transform: [{rotateY: this.leftFlipInterpolate}],
    };
    const backFlipStyle = {
      ...flipCard,
      ...flipCardBack,
      transform: [{rotateY: this.rightFlipInterpolate}],
    };

    return (
      <>
        <View style={headerContainer}>
          <Text style={heading}>FLIPPING ANIMATION</Text>
        </View>
        <View style={container} {...this.panResponder.panHandlers}>
          <Animated.View style={frontFlipStyle}>
            <Text style={flipCardText}>Swipe Left to Flip</Text>
          </Animated.View>
          <Animated.View style={backFlipStyle}>
            <Text style={flipCardText}>Swipe Right to Flip</Text>
          </Animated.View>
        </View>
      </>
    );
  }
}

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
  flipCard: {
    ...center,
    width: squareSize,
    height: squareSize,
    backgroundColor: lightGreen,
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    ...absolutePosition,
    backgroundColor: pink,
  },
  flipCardText: {
    ...textCenter,
    ...uppercase,
    ...bold,
  },
};

export default FlippingAnim;
