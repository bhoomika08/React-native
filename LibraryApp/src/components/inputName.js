import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, Spacing, Global} from 'stylesheets';

const InputName = () => {
  const [name, setInputName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('name').then((value) => setInputName(value));
  });

  const setName = (value) => {
    AsyncStorage.setItem('name', value);
    setInputName(value);
  };

  return (
    <View>
      <TextInput style={styles.textInput} onChangeText={setName} />
      <Text>{name}</Text>
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

export default InputName;
