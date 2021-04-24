import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {HeaderBackButton} from '@react-navigation/stack';
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
import {booksList} from 'constants/navigators';
import {updateBooks} from 'store/actions/library';
import {omit, alert} from 'helpers/application';
import {GetBookDetails} from 'helpers/library';
import {isEmail, isFieldEmpty, isUrl} from 'helpers/validation';
import {InputField, Checkbox, Dropdown} from 'components/shared/form-controls';
import {useHardwareBack} from 'components/custom/hardware-back';

const {rowFlex, flexPoint45, spaceBetween, horizontalCenter, center} = Global;
const {fs20, bold} = Typography;
const {p10, p20, py10, m10, py20, mtAuto} = Spacing;
const {lightGreen, white} = Colors;

const defaultObj = {};

const Form = (props) => {
  const {id: bookId, name, author, publisher, price: bookPrice} =
    props.selectedBook || defaultObj;

  const booksLen = Object.keys(books).length;
  const [fields, setFields] = useState({
    id: bookId ? bookId : booksLen + 1,
    bookName: name,
    authorName: author,
    price: bookPrice,
    email: '',
    url: '',
    errors: {},
  });
  const [selectedPublisherValue, setSelectedPublisherValue] = useState(
    publisher,
  );
  const [isDisplayChecked, setIsDisplayChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {navigation, selectedBook} = props;
    navigation.setOptions({
      title: selectedBook ? 'UPDATE BOOK DETAILS' : 'CREATE NEW BOOK',
      headerLeft: () => (
        <HeaderBackButton label="Listing" onPress={navigateToListing} />
      ),
    });
  });

  const navigateToListing = () => {
    const {navigation} = props;
    navigation.navigate(booksList);
  };

  const setSelectedPublisher = (value) => {
    setSelectedPublisherValue(value);
  };

  const toggleSelection = () => {
    setIsDisplayChecked(!isDisplayChecked);
  };

  const updateValue = (text, field) => {
    setFields({
      ...fields,
      [field]: text,
      errors: omit(field, fields.errors),
    });
  };

  const validateForm = () => {
    const {bookName, authorName, price, email, url} = fields;
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
      return setFields({errors});
    }
    handleFormSubmit();
  };

  const handleFormSubmit = () => {
    const {updateBooks} = props;
    const data = {...fields, selectedPublisherValue};
    setIsLoading(true);
    const booksListItem = GetBookDetails(data);
    updateBooks(booksListItem);
    onSuccess();
  };

  const onSuccess = () => {
    resetAllFields();
    navigateToListing();
    alert('Book Details added / updated');
  };

  const resetAllFields = () => {
    setFields({
      bookName: '',
      authorName: '',
      price: '',
      email: '',
      url: '',
      errors: {},
    });
    setSelectedPublisherValue('');
    setIsLoading(false);
    setIsDisplayChecked(true);
  };

  const {bookName, authorName, price, email, url, errors} = fields;
  const {formContainer, inputStyle, checkboxContainer, button, label} = styles;
  const {selectedBook} = props;
  useHardwareBack();
  return (
    <>
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
                onChangeText={updateValue}
              />
              <InputField
                label="Author Name"
                placeholder="Author Name"
                style={inputStyle}
                inputKey="authorName"
                value={authorName}
                isReq
                error={errors.authorName}
                onChangeText={updateValue}
              />
              <Dropdown
                label="Publishers"
                placeholder="Select a publisher"
                options={publishers}
                selectedValue={selectedPublisherValue}
                onValueChange={setSelectedPublisher}
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
                onChangeText={updateValue}
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
                    onChangeText={updateValue}
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
                    onChangeText={updateValue}
                  />
                </View>
              </View>
              <View style={checkboxContainer}>
                <Checkbox
                  value={isDisplayChecked}
                  onValueChange={toggleSelection}
                  label="Do you want to display this Book in Library?"
                  labelStyle={label}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <View style={mtAuto}>
        <Pressable style={button} onPress={validateForm}>
          <Text style={[fs20, bold]}>{selectedBook ? 'UPDATE' : 'SUBMIT'}</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    ...p20,
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
  updateBooks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
