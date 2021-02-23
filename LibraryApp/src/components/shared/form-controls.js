import React from 'react';
import {View, Text, StyleSheet, TextInput, ActionSheetIOS} from 'react-native';
import {Colors, Spacing, Global, Typography} from 'stylesheets';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

const {
  rowFlex,
  borderRadius5,
  borderWidth1,
  verticalCenter,
  spaceBetween,
} = Global;
const {fs20, bold} = Typography;
const {mb20} = Spacing;
const {darkgrey, grey, red, blue} = Colors;
const isIOSPlatform = Platform.OS == 'ios';

export const Label = ({label, isReq, customStyle}) => {
  const {labelText, redText} = styles;
  return (
    <Text style={[labelText, customStyle]}>
      {label} {isReq && <Text style={redText}>*</Text>}
    </Text>
  );
};

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
  const {redText, errorField, inputField, errorText} = styles;
  return (
    <View style={mb20}>
      {label && <Label label={label} isReq={isReq} />}
      <TextInput
        value={value}
        placeholder={placeholder}
        style={[
          borderRadius5,
          borderWidth1,
          style,
          error ? errorField : inputField,
        ]}
        keyboardType={keyboardType}
        onChangeText={(text) => onChangeText(text, inputKey)}
      />
      {error && <Text style={[errorText, redText]}>{error}</Text>}
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
          <View style={verticalCenter}>
            <Text style={bold}>&#9660;</Text>
          </View>
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
  },
  redText: {
    color: red,
  },
  errorText: {
    textAlign: 'right',
  },
  errorField: {
    borderColor: red,
  },
  iosDropdownContainer: {
    ...rowFlex,
    ...spaceBetween,
    padding: 10,
    ...borderWidth1,
    ...borderRadius5,
    borderColor: grey,
  },
  picker: {
    ...borderWidth1,
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
