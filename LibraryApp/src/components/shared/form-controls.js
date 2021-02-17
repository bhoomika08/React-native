import React from 'react';
import {View, Text, StyleSheet, TextInput, ActionSheetIOS} from 'react-native';
import {Colors, Spacing, Global, Typography} from 'stylesheets';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

const isIOSPlatform = Platform.OS == 'ios';

export const InputField = ({
  label,
  placeholder = '',
  style = '',
  inputKey = '',
  value,
  keyboardType,
  error,
  onChangeText = () => {},
}) => {
  const {labelText, errorField, inputField, errorText} = styles;
  return (
    <View style={{marginBottom: 20}}>
      {label && <Text style={labelText}>{label}</Text>}
      <TextInput
        value={value}
        placeholder={placeholder}
        style={[Global.borderRadius5, style, error ? errorField : inputField]} // function to return object
        keyboardType={keyboardType}
        onChangeText={(text) => onChangeText(text, inputKey)}
      />
      {error && <Text style={errorText}>{error}</Text>}
    </View>
  );
};

export const Checkbox = ({
  checkboxStyle = '',
  value,
  onValueChange = () => {},
  label,
  labelStyle = '',
}) => (
  <>
    <CheckBox
      style={checkboxStyle}
      value={value}
      onValueChange={onValueChange}
    />
    {label && <Text style={labelStyle}>{label}</Text>}
  </>
);

export const Dropdown = ({label, selectedId, options = [], onValueChange}) => {
  const dropdownOptions = Object.values(options);
  const CANCEL_INDEX = dropdownOptions.length;
  const iosDropdownOptions = [...dropdownOptions, {value: "Cancel"}];

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: iosDropdownOptions.map(({value}) => value),
        cancelButtonIndex: CANCEL_INDEX,
      },
      (buttonIndex) => {
        if (buttonIndex != CANCEL_INDEX) {
          onValueChange(iosDropdownOptions[buttonIndex].id);
        }
      },
    );
  };
  return (
    <View style={{ marginBottom: 20}}>
      {label && <Text style={styles.labelText}>{label}</Text>}
      {isIOSPlatform ? (
        <View style={styles.iosDropdownContainer}>
          <Text onPress={showActionSheet}>
            {options[selectedId].value}
          </Text>
          <Text style={Typography.bold}>&#9660;</Text>
        </View>
      ) : (
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedId}
            mode="dropdown"
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
            onValueChange={onValueChange}>
            {dropdownOptions.map(({id, value}) => (
              <Picker.Item key={id} label={value} value={id} />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontSize: 18,
    fontWeight: isIOSPlatform ? '500' : 'bold',
    marginBottom: 5
  },
  inputField: {
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  errorText: {
    color: Colors.red,
    ...Spacing.mr10,
    textAlign: 'right',
  },
  errorField: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
  iosDropdownContainer: {
    ...Global.rowFlex,
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    ...Global.borderRadius5,
    borderColor: Colors.grey,
  },
  picker: {
    borderWidth: 1,
    ...Global.borderRadius5,
    borderColor: Colors.grey,
  },
  dropdown: {
    width: '80%',
  },
  dropdownItem: {
    backgroundColor: Colors.grey,
    ...Global.borderRadius5,
    color: Colors.blue,
    ...Typography.fs20,
  },
});
