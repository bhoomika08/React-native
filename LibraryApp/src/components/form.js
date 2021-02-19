import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {user} from 'constants/api';
import {publishers} from 'constants/data';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {validationMessages} from 'constants/locale';
import {omit, stringifyResponse, alert} from 'helpers/application';
import {isEmail, isFieldEmpty, isUrl} from 'helpers/validation';
import {InputField, Checkbox, Dropdown} from 'components/shared/form-controls';

const {rowFlex, flex1, spaceBetween, horizontalCenter, center} = Global;
const {fs20, fs30, bold, uppercase} = Typography;
const {p10, p15, py10, m10, mb10, py20, mtAuto} = Spacing;
const {lightBlue, lightGreen, purple, white} = Colors;
const isIOSPlatform = Platform.OS == 'ios';

class Form extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedPublisherId: '',
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
      selectedPublisherId: '',
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
      formContainer,
      inputStyle,
      checkboxContainer,
      button,
      label,
    } = styles;

    return (
      <KeyboardAvoidingView
        style={innerContainer}
        behavior={isIOSPlatform ? 'padding' : null}
        keyboardVerticalOffset={0}>
        <View style={headingContainer}>
          <Text style={formLabel}>Library Form</Text>
        </View>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={formContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <InputField
                  label="Book Name"
                  placeholder="Book Name"
                  style={inputStyle}
                  inputKey="bookName"
                  value={bookName}
                  isReq
                  error={errors.bookName}
                  onChangeText={this.updateValue}
                />
                <InputField
                  label="Author Name"
                  placeholder="Author Name"
                  style={inputStyle}
                  inputKey="authorName"
                  value={authorName}
                  isReq
                  error={errors.authorName}
                  onChangeText={this.updateValue}
                />
                <Dropdown
                  label="Publishers"
                  placeholder="Select a publisher"
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
                  isReq
                  error={errors.price}
                  onChangeText={this.updateValue}
                />
                <View style={[rowFlex, spaceBetween]}>
                  <View style={flex1}>
                    <InputField
                      label="Email"
                      keyboardType="email-address"
                      placeholder="Email"
                      style={inputStyle}
                      inputKey="email"
                      value={email}
                      isReq
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
                      isReq
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
              </>
            )}
          </View>
        </ScrollView>

        <View style={mtAuto}>
          <Pressable style={button} onPress={this.validateForm}>
            <Text style={[fs20, bold]}>SUBMIT</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop: isIOSPlatform ? getStatusBarHeight() : 0,
  },
  headingContainer: {
    ...horizontalCenter,
    backgroundColor: lightBlue,
    ...py10,
    ...mb10,
  },
  formLabel: {
    ...fs30,
    color: purple,
    ...uppercase,
    ...bold,
  },
  formContainer: {
    ...p15,
  },
  inputStyle: {
    ...p10,
    ...fs20,
  },
  formText: {
    ...center,
    color: white,
    ...fs20,
  },
  text: {
    color: white,
    ...fs20,
  },
  checkboxContainer: {
    ...rowFlex,
    ...center,
    ...py10,
  },
  label: {
    ...m10,
  },
  button: {
    ...horizontalCenter,
    backgroundColor: lightGreen,
    ...py20,
  },
});

export default Form;
