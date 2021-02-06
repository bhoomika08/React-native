import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import {increaseCount} from 'store/actions/counter.js';
import {Colors, Spacing, Global} from 'stylesheets';

const Counter = ({increaseCount, count}) => {
  const onPress = () => increaseCount();
  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPress}>
        <View style={styles.button}>
          <Text>Tap to Increase Count</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count ? count : null}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Spacing.mt50
  },
  button: {
    ...Global.horizontalCenter,
    backgroundColor: Colors.grey,
    ...Spacing.p10
  },
  countContainer: {
    ...Global.horizontalCenter,
    ...Spacing.p10
  },
  countText: {
    color: Colors.blue,
  },
});

function mapStateToProps({counter: {count}}) {
  return {
    count,
  };
}

const mapDispatchToProps = {
  increaseCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
