import React from 'react';
import {View, Text, StyleSheet, TextInput, ActionSheetIOS} from 'react-native';
import {Colors, Spacing, Global, Typography} from 'stylesheets';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

const {rowFlex, borderRadius5} = Global;
const {fs20, bold} = Typography;
const {mr10, mb20} = Spacing;
const {darkgrey, grey, red, blue} = Colors;
const isIOSPlatform = Platform.OS == 'ios';

export const InputField = ({
  label,
  placeholder = '',
  style = '',
  inputKey = '',
  value,
  keyboardType,
  error,
  isReq,
  onChangeText = () => {},
}) => {
  const {labelText, errorField, inputField, errorText} = styles;
  return (
    <View style={mb20}>
      {label && <Text style={labelText}>{label}{isReq && "*"}</Text>}
      <TextInput
        value={value}
        placeholder={placeholder}
        style={[borderRadius5, style, error ? errorField : inputField]} // function to return object
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

export const Dropdown = ({
  label,
  placeholder,
  selectedId,
  options = [],
  onValueChange,
}) => {
  const dropdownOptions = Object.values(options);
  const CANCEL_INDEX = dropdownOptions.length;
  const iosDropdownOptions = [...dropdownOptions, {value: 'Cancel'}];

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: iosDropdownOptions.map(({value}) => value),
        cancelButtonIndex: CANCEL_INDEX,
      },
      (buttonIndex) => {
        if (buttonIndex != CANCEL_INDEX) {
          onValueChange(iosDropdownOptions?.[buttonIndex]?.id);
        }
      },
    );
  };

  const {
    labelText,
    placeholderText,
    iosDropdownContainer,
    picker,
    dropdown,
  } = styles;
  const selectedValue = options?.[selectedId]?.value;
  return (
    <View style={mb20}>
      {label && <Text style={labelText}>{label}</Text>}
      {isIOSPlatform ? (
        <View style={iosDropdownContainer}>
          <Text
            onPress={showActionSheet}
            style={[fs20, selectedValue ? '' : placeholderText]}>
            {selectedValue ? selectedValue : placeholder}
          </Text>
          <Text style={bold}>&#9660;</Text>
        </View>
      ) : (
        <View style={picker}>
          <Picker
            selectedValue={selectedId}
            mode="dropdown"
            style={dropdown}
            itemStyle={dropdownItem}
            onValueChange={onValueChange}>
            <Picker.Item value="" label={placeholder} />
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
    marginBottom: 5,
  },
  placeholderText: {
    color: darkgrey,
  },
  inputField: {
    borderColor: grey,
    borderWidth: 1,
  },
  errorText: {
    color: red,
    textAlign: 'right',
  },
  errorField: {
    borderColor: red,
    borderWidth: 1,
  },
  iosDropdownContainer: {
    ...rowFlex,
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    ...borderRadius5,
    borderColor: grey,
  },
  picker: {
    borderWidth: 1,
    ...borderRadius5,
    borderColor: grey,
  },
  dropdown: {
    width: '80%',
  },
  dropdownItem: {
    backgroundColor: grey,
    ...borderRadius5,
    color: blue,
    ...fs20,
  },
});
