import React from 'react';
import {
  NativeModules,
  LayoutAnimation,
  TouchableOpacity,
  View,
  Text,
  Animated,
  Pressable,
} from 'react-native';
import {blue, lightBlue, lightGreen, orange} from 'stylesheets/colors';
import {flex1, horizontalCenter, center} from 'stylesheets/global';
import {py20} from 'stylesheets/spacing';
import {fs25, fs30, bold, uppercase, textCenter} from 'stylesheets/typography';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const circleSize = 20;

class BubblingCapturing extends React.Component {
  constructor() {
    super();
    this.state = {
      size: circleSize,
      count: 0,
    };
    this.onPress = this.onPress.bind(this);
    this.increaseSize = this.increaseSize.bind(this);
    this.decreaseSize = this.decreaseSize.bind(this);
    this.reset = this.reset.bind(this);
  }

  onPress() {
    const {count} = this.state;
    LayoutAnimation.spring();
    switch (true) {
      case count < 5:
        return this.increaseSize();
      case count >= 5 && count < 10:
        return this.decreaseSize();
      default:
        return this.reset();
    }
  }

  increaseSize() {
    const {size, count} = this.state;
    this.setState({
      size: size * 2,
      count: count + 1,
    });
  }

  decreaseSize() {
    const {size, count} = this.state;
    this.setState({
      size: size / 3,
      count: count + 1,
    });
  }

  reset() {
    this.setState({
      size: circleSize,
      count: 0,
    });
  }

  getAnimatedStyle() {
    const {size} = this.state;
    return {
      ...styles.circle,
      width: size,
      height: size,
      borderRadius: size / 2,
    };
  }

  render() {
    const {container, headerContainer, heading, button, buttonText} = styles;
    const animatedStyle = this.getAnimatedStyle();
    return (
      <>
        <View style={headerContainer}>
          <Text style={heading}>BUBBLING CAPTURING ANIMATION</Text>
        </View>
        <View style={container}>
          <TouchableOpacity onPress={this.onPress}>
            <Animated.View style={animatedStyle}></Animated.View>
          </TouchableOpacity>
        </View>
        <Pressable onPress={this.reset}>
          <View style={button}>
            <Text style={buttonText}>Reset Circle Size</Text>
          </View>
        </Pressable>
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
    ...textCenter,
    ...fs30,
    color: blue,
    ...bold,
    ...uppercase,
  },
  circle: {
    backgroundColor: orange,
  },
  button: {
    backgroundColor: lightGreen,
    ...py20,
  },
  buttonText: {
    ...textCenter,
    ...fs25,
    ...uppercase,
    ...bold,
  },
};

export default BubblingCapturing;
