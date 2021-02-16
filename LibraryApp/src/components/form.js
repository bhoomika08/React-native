import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {user} from 'constants/api';
import {publishers} from 'constants/data';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {validationMessages} from 'constants/locale';
import {omit, stringifyResponse, alert} from 'helpers/application';
import {isEmail, isFieldEmpty, isUrl} from 'helpers/validation';
import {InputField, Checkbox, Dropdown} from 'components/shared/form-controls';

const isIOSPlatform = Platform.OS == 'ios';

class Form extends React.PureComponent {
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
      isLoading: false,
    };
    this.setSelectedPublisherId = this.setSelectedPublisherId.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.resetAllFields = this.resetAllFields.bind(this);
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
    this.setState({isLoading: true});
    fetch(user, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        this.onSuccess(response);
      })
      .catch((error) => this.onError(error));
  }

  onSuccess(response) {
    this.resetAllFields();
    alert('Success', stringifyResponse(response));
  }

  onError(error) {
    this.setState({isLoading: false});
    alert('Error', error.message);
  }

  resetAllFields() {
    this.setState({
      selectedPublisherId: '1',
      isDisplayChecked: true,
      bookName: '',
      authorName: '',
      price: '',
      email: '',
      url: '',
      errors: {},
      isLoading: false,
    });
  }

  render() {
    const {
      selectedPublisherId,
      isDisplayChecked,
      bookName,
      authorName,
      price,
      email,
      url,
      errors,
      isLoading,
    } = this.state;
    const {
      innerContainer,
      headingContainer,
      formLabel,
      inputStyle,
      checkboxContainer,
      button,
      label,
    } = styles;
    const {rowFlex, flex1} = Global;
    return (
      <KeyboardAvoidingView behavior={isIOSPlatform ? 'padding' : null}>
        <View style={innerContainer}>
          <View style={headingContainer}>
            <Text style={formLabel}>Library</Text>
          </View>
          <View style={[Global.flex1, Global.verticalCenter]}>
            <Spinner visible={isLoading} />
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <InputField
                label="Book Name"
                placeholder="Book Name"
                style={inputStyle}
                inputKey="bookName"
                value={bookName}
                error={errors.bookName}
                onChangeText={this.updateValue}
              />
              <InputField
                label="Author Name"
                placeholder="Author Name"
                style={inputStyle}
                inputKey="authorName"
                value={authorName}
                error={errors.authorName}
                onChangeText={this.updateValue}
              />
              <Dropdown
                label="Publishers"
                options={publishers}
                selectedId={selectedPublisherId}
                onValueChange={this.setSelectedPublisherId}
              />
              <InputField
                label="Price"
                keyboardType="numeric"
                placeholder="Price"
                style={inputStyle}
                inputKey="price"
                value={price}
                error={errors.price}
                onChangeText={this.updateValue}
              />
              <View style={rowFlex}>
                <View style={flex1}>
                  <InputField
                    label="Email"
                    keyboardType="email-address"
                    placeholder="Email"
                    style={inputStyle}
                    inputKey="email"
                    value={email}
                    error={errors.email}
                    onChangeText={this.updateValue}
                  />
                </View>
                <View style={flex1}>
                  <InputField
                    label="Website"
                    keyboardType="url"
                    placeholder="Website"
                    style={inputStyle}
                    inputKey="url"
                    value={url}
                    error={errors.url}
                    onChangeText={this.updateValue}
                  />
                </View>
              </View>
              <View style={checkboxContainer}>
                <Checkbox
                  value={isDisplayChecked}
                  onValueChange={this.toggleSelection}
                  label="Do you want to display this Book in Library?"
                  labelStyle={label}
                />
              </View>
              <Pressable style={button} onPress={this.validateForm}>
                <Text style={[Typography.fs20, Typography.bold]}>SUBMIT</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    marginTop: isIOSPlatform ? getStatusBarHeight() : 0,
  },
  headingContainer: {
    ...Global.horizontalCenter,
    ...Spacing.m10,
  },
  formLabel: {
    ...Typography.fs30,
    color: Colors.purple,
    textTransform: 'uppercase',
    ...Typography.bold,
  },
  inputStyle: {
    ...Spacing.m5,
    ...Spacing.p10,
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
    backgroundColor: Colors.lightGreen,
    ...Global.borderRadius5,
    width: '100%',
    ...Global.selfCenter,
    ...Spacing.p20,
  },
});

export default Form;
