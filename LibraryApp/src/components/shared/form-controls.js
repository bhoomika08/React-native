import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActionSheetIOS,
  Pressable,
} from 'react-native';
import {Colors, Spacing, Global, Typography} from 'stylesheets';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';

const {
  rowFlex,
  borderRadius5,
  borderWidth1,
  verticalCenter,
  spaceBetween,
  textRight,
} = Global;
const {fs18, fs20, bold} = Typography;
const {p10, mb5, mb20} = Spacing;
const {dimGrey, grey, red, blue, white} = Colors;
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
  const {redText, errorField, errorText} = styles;
  return (
    <View style={mb20}>
      {label && <Label label={label} isReq={isReq} />}
      <TextInput
        value={value}
        placeholder={placeholder}
        style={[borderRadius5, style, error ? errorField : '']}
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
  selectedValue,
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
          onValueChange(iosDropdownOptions?.[buttonIndex]?.value);
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
    dropdownItem,
  } = styles;

  const selectedVal = selectedValue;
  return (
    <View style={mb20}>
      {label && <Text style={labelText}>{label}</Text>}
      {isIOSPlatform ? (
        <Pressable style={iosDropdownContainer} onPress={showActionSheet}>
          <Text style={[fs20, selectedVal ? '' : placeholderText]}>
            {selectedVal ? selectedVal : placeholder}
          </Text>
          <View style={verticalCenter}>
            <Text style={bold}>&#9660;</Text>
          </View>
        </Pressable>
      ) : (
        <View style={picker}>
          <Picker
            selectedValue={selectedValue}
            mode="dropdown"
            style={dropdown}
            itemStyle={dropdownItem}
            onValueChange={onValueChange}>
            <Picker.Item value="" label={placeholder} />
            {dropdownOptions.map(({id, value}) => (
              <Picker.Item key={id} label={value} value={value} />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    ...fs18,
    fontWeight: isIOSPlatform ? '500' : 'bold',
    ...mb5,
  },
  placeholderText: {
    color: dimGrey,
  },
  redText: {
    color: red,
  },
  errorText: {
    ...textRight,
  },
  errorField: {
    ...borderWidth1,
    borderColor: red,
  },
  iosDropdownContainer: {
    ...rowFlex,
    ...spaceBetween,
    ...p10,
    ...borderRadius5,
    backgroundColor: white,
  },
  picker: {
    ...borderRadius5,
    backgroundColor: white,
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
