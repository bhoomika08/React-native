import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {publishers, books} from 'constants/data';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {validationMessages} from 'constants/locale';
import {booksList} from 'constants/app-defaults';
import {setActiveTab, updateBooks} from 'store/actions/library';
import {omit, alert} from 'helpers/application';
import {GetBookDetails} from 'helpers/library';
import {isEmail, isFieldEmpty, isUrl} from 'helpers/validation';
import {InputField, Checkbox, Dropdown} from 'components/shared/form-controls';
import {previous} from 'constants/icons';

const {
  rowFlex,
  flexPoint45,
  spaceBetween,
  horizontalCenter,
  verticalCenter,
  center,
} = Global;
const {iconFont, fs16, fs20, bold} = Typography;
const {p10, p15, py10, m10, py20, px15, mtAuto} = Spacing;
const {blue, lightGreen, white} = Colors;

class Form extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      id = '',
      name = '',
      author = '',
      publisher = '',
      price = '',
    } = props.selectedBook;

    const booksLen = Object.keys(books).length;

    this.state = {
      id: id ? id : booksLen + 1,
      selectedPublisherValue: publisher,
      isDisplayChecked: true,
      bookName: name,
      authorName: author,
      price,
      email: '',
      url: '',
      errors: {},
      isLoading: false,
    };

    this.displayBooksList = this.displayBooksList.bind(this);
    this.setSelectedPublisher = this.setSelectedPublisher.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.resetAllFields = this.resetAllFields.bind(this);
  }

  displayBooksList() {
    const {setActiveTab} = this.props;
    setActiveTab(booksList);
  }

  setSelectedPublisher(value) {
    this.setState({
      selectedPublisherValue: value,
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
    Keyboard.dismiss();
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
    const {updateBooks} = this.props;
    const data = {...this.state};
    this.setState({isLoading: true});
    const booksListItem = GetBookDetails(data);
    updateBooks(booksListItem);
    this.onSuccess();
  }

  onSuccess() {
    const {setActiveTab} = this.props;
    this.resetAllFields();
    alert('Book Details added / updated');
    setActiveTab(booksList);
  }

  resetAllFields() {
    this.setState({
      selectedPublisherValue: '',
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
      selectedPublisherValue,
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
      backNavigationContainer,
      backIcon,
      backNavigationText,
      formContainer,
      inputStyle,
      checkboxContainer,
      button,
      label,
    } = styles;
    const {selectedBook} = this.props;
    const containsSelectedBook = Object.keys(selectedBook).length > 0;
    return (
      <>
        <View style={backNavigationContainer}>
          <Pressable style={rowFlex} onPress={this.displayBooksList}>
            <View style={verticalCenter}>
              <Text style={backIcon}>{previous}</Text>
            </View>
            <Text style={backNavigationText}>Back to Books List</Text>
          </Pressable>
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
                  selectedValue={selectedPublisherValue}
                  onValueChange={this.setSelectedPublisher}
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
                  <View style={flexPoint45}>
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
                  <View style={flexPoint45}>
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
            <Text style={[fs20, bold]}>
              {containsSelectedBook ? 'UPDATE' : 'SUBMIT'}
            </Text>
          </Pressable>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  backNavigationContainer: {
    ...rowFlex,
    ...py10,
  },
  backIcon: {
    ...iconFont,
    color: blue,
    ...fs16,
    ...px15,
  },
  backNavigationText: {
    color: blue,
    ...fs16,
  },
  formContainer: {
    ...p15,
  },
  inputStyle: {
    ...p10,
    ...fs20,
    backgroundColor: white,
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

function mapStateToProps({library: {selectedBook}}) {
  return {
    selectedBook,
  };
}

const mapDispatchToProps = {
  setActiveTab,
  updateBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
