import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, KeyboardAvoidingView} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import {booksList} from 'constants/app-defaults';
import {setActiveTab} from 'store/actions/library';
import Form from 'components/form';
import BooksList from 'components/books-list';

const {horizontalCenter} = Global;
const {fs30, bold, uppercase} = Typography;
const {py10, mb20} = Spacing;
const {lightBlue, purple, grey} = Colors;
const isIOSPlatform = Platform.OS == 'ios';

const LibraryApp = ({activeTab}) => {
  const isListActive = activeTab == booksList;
  const {innerContainer, headingContainer, formLabel} = styles;
  return (
    <KeyboardAvoidingView
      style={innerContainer}
      behavior={isIOSPlatform ? 'padding' : null}
      keyboardVerticalOffset={0}>
      <View style={headingContainer}>
        <Text style={formLabel}>Library</Text>
      </View>
      {isListActive ? <BooksList /> : <Form />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop: isIOSPlatform ? getStatusBarHeight() : 0,
    backgroundColor: grey,
  },
  headingContainer: {
    ...horizontalCenter,
    backgroundColor: lightBlue,
    ...py10,
    ...mb20,
  },
  formLabel: {
    ...fs30,
    color: purple,
    ...uppercase,
    ...bold,
  },
});

function mapStateToProps({library: {activeTab}}) {
  return {
    activeTab,
  };
}

const mapDispatchToProps = {
  setActiveTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryApp);
