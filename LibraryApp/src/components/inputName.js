import React from 'react';
import {connect} from 'react-redux';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {setName} from 'store/actions/user.js';
import {Colors, Spacing, Global} from 'stylesheets';

const InputName = ({userName, setName}) => {
  const setInputName = (value) => {
    setName(value);
  };

  return (
    <View>
      <TextInput style={styles.textInput} onChangeText={setInputName} />
      <Text>{userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    ...Global.textCenter,
    ...Spacing.m5,
    height: 100,
    width: 300,
    borderWidth: 1,
    backgroundColor: Colors.cyan,
  },
});

function mapStateToProps({user: {name: userName}}) {
  return {
    userName,
  };
}

const mapDispatchToProps = {
  setName,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputName);

