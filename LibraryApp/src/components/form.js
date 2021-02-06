import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {user} from 'constants/api';
import {publishers} from 'constants/data';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {validationMessages} from 'constants/locale';
import {omit} from 'helpers/application';
import {isEmail, isFieldEmpty, isUrl} from 'helpers/validation';
import {InputField, Checkbox} from 'components/shared/form-controls';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPublisherId: '1',
      isDisplayChecked: true,
      bookName: '',
      authorName: '',
      price: '',
      email: '',
      url: '',
      errors: {},
    };
    this.toggleSelection = this.toggleSelection.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  setSelectedPublisherId(id) {
    this.setState({
      selectedPublisherId: id,
    });
  }
  toggleSelection() {
    const {isDisplayChecked} = this.state;
    this.setState({
      isDisplayChecked: !isDisplayChecked,
    });
  }
  updateValue(text, field) {
    this.setState({
      [field]: text,
      errors: omit(field, this.state.errors),
    });
  }

  validateForm() {
    const {bookName, authorName, price, email, url} = this.state;
    const {required, invalid} = validationMessages;
    let errors = {};
    if (isFieldEmpty(bookName)) {
      errors.bookName = required;
    }
    if (isFieldEmpty(authorName)) {
      errors.authorName = required;
    }
    if (isFieldEmpty(price)) {
      errors.price = required;
    }
    if (isFieldEmpty(email)) {
      errors.email = required;
    }
    if (!isFieldEmpty(email) && !isEmail(email)) {
      errors.email = invalid;
    }
    if (isFieldEmpty(url)) {
      errors.url = required;
    }
    if (!isFieldEmpty(url) && !isUrl(url)) {
      errors.url = invalid;
    }
    if (Object.keys(errors).length > 0) {
      return this.setState({errors});
    }
    this.handleFormSubmit();
  }

  handleFormSubmit() {
    const data = {...this.state};
    fetch(user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((rawResponse) => rawResponse.json())
      .catch((error) => console.log('Error', error))
      .then((response) => console.log('Success', response));
  }

  render() {
    const {selectedPublisherId, errors} = this.state;
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.innerContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.formLabel}>Library</Text>
          </View>
          <ScrollView bounces={false}>
            <InputField
              placeholder="Book Name"
              style={styles.inputStyle}
              inputKey="bookName"
              error={errors.bookName}
              onChangeText={this.updateValue}
            />
            <InputField
              placeholder="Author Name"
              style={styles.inputStyle}
              inputKey="authorName"
              error={errors.authorName}
              onChangeText={this.updateValue}
            />
            <View style={styles.picker}>
              <Picker
                selectedValue={selectedPublisherId}
                mode="dropdown"
                style={styles.dropdown}
                itemStyle={styles.dropdownItem}
                onValueChange={(itemValue) =>
                  this.setSelectedPublisherId(itemValue)
                }>
                {Object.values(publishers).map(({id, value}) => (
                  <Picker.Item key={id} label={value} value={id} />
                ))}
              </Picker>
            </View>
            <InputField
              keyboardType="numeric"
              placeholder="Price"
              style={styles.inputStyle}
              inputKey="price"
              error={errors.price}
              onChangeText={this.updateValue}
            />
            <InputField
              keyboardType="email-address"
              placeholder="Email"
              style={styles.inputStyle}
              inputKey="email"
              error={errors.email}
              onChangeText={this.updateValue}
            />
            <InputField
              keyboardType="url"
              placeholder="Website"
              style={styles.inputStyle}
              inputKey="url"
              error={errors.url}
              onChangeText={this.updateValue}
            />
            <View style={styles.checkboxContainer}>
              <Checkbox
                onValueChange={this.toggleSelection}
                label="Do you want to display this Book in Library?"
                labelStyle={styles.label}
              />
            </View>

            <TouchableHighlight
              style={styles.button}
              onPress={this.validateForm}>
              <View>
                <Text>Touch Here</Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: 30,
  },
  headingContainer: {
    ...Global.horizontalCenter,
    ...Spacing.m10,
  },
  formLabel: {
    ...Typography.fs20,
    color: Colors.blue,
  },
  inputStyle: {
    width: 350,
    height: 50,
    backgroundColor: Colors.grey,
    ...Spacing.m10,
    ...Spacing.p10,
    ...Global.borderRadius10,
    ...Typography.fs20,
  },
  formText: {
    ...Global.center,
    color: Colors.white,
    ...Typography.fs20,
  },
  text: {
    color: Colors.white,
    ...Typography.fs20,
  },
  picker: {
    ...Spacing.mt10,
    ...Global.horizontalCenter,
    ...Spacing.mb10,
  },
  dropdown: {
    width: '80%',
  },
  dropdownItem: {
    backgroundColor: Colors.grey,
    ...Global.borderRadius10,
    color: Colors.blue,
    ...Typography.fs20,
  },
  checkboxContainer: {
    ...Global.rowFlex,
    ...Spacing.m10,
  },
  label: {
    ...Spacing.m10,
  },
  button: {
    ...Spacing.m10,
    ...Spacing.mb20,
    ...Global.horizontalCenter,
    backgroundColor: Colors.lightBlue,
    ...Global.borderRadius10,
    width: 200,
    ...Global.selfCenter,
    ...Spacing.p20,
  },
});

export default Form;
