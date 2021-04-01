import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Global, Colors, Typography} from 'stylesheets';
import {booksList, libraryForm, showBookDetails} from 'constants/app-defaults';
import Form from 'components/form';
import BooksList from 'components/books-list';
import ShowBook from 'components/show-book';

const {textCenter} = Global;
const {fs18, bold, uppercase} = Typography;
const {lightBlue, purple, grey} = Colors;
const isIOSPlatform = Platform.OS == 'ios';

const Stack = createStackNavigator();

const LibraryApp = () => {
  const {innerContainer, headingContainer, formLabel} = styles;
  return (
    <KeyboardAvoidingView
      style={innerContainer}
      behavior={isIOSPlatform ? 'padding' : null}
      keyboardVerticalOffset={0}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: headingContainer,
            headerTitleStyle: formLabel,
          }}>
          <Stack.Screen
            name={booksList}
            component={BooksList}
            options={{title: 'ALL BOOKS'}}
          />
          <Stack.Screen
            name={libraryForm}
            component={Form}
            // options={{title: 'CREATE A NEW BOOK'}}
          />
          <Stack.Screen name={showBookDetails} component={ShowBook} />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    backgroundColor: grey,
  },
  headingContainer: {
    backgroundColor: lightBlue,
  },
  formLabel: {
    ...textCenter,
    ...fs18,
    color: purple,
    ...uppercase,
    ...bold,
  },
});

export default LibraryApp;
