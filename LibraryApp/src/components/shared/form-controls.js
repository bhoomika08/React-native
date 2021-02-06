import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {Colors, Spacing} from 'stylesheets';
import CheckBox from '@react-native-community/checkbox';

export const InputField = ({
  placeholder = '',
  style = '',
  inputKey = '',
  keyboardType,
  error,
  onChangeText = () => {},
}) => (
  <>
    <TextInput
      placeholder={placeholder}
      style={[style, error ? styles.errorField : '']}
      keyboardType={keyboardType}
      onChangeText={(text) => onChangeText(text, inputKey)}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </>
);

export const Checkbox = ({
  checkboxStyle = '',
  checked = true,
  onValueChange = () => {},
  label,
  labelStyle = '',
}) => (
  <>
    <CheckBox
      style={checkboxStyle}
      value={checked}
      onValueChange={onValueChange}
    />
    {label && <Text style={labelStyle}>{label}</Text>}
  </>
);

const styles = StyleSheet.create({
  errorText: {
    color: Colors.red,
    ...Spacing.ml10,
  },
  errorField: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
});
