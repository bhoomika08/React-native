import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {booksList, libraryForm, showBookDetails} from 'constants/app-defaults';
import {Global, Colors, Typography} from 'stylesheets';
import Form from 'components/form';
import BooksList from 'components/books-list';
import ShowBook from 'components/show-book';

const {textCenter} = Global;
const {fs18, bold, uppercase} = Typography;
const {lightBlue, purple} = Colors;

const Stack = createStackNavigator();

const AuthNavigators = () => {
  const {headingContainer, formLabel} = styles;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={booksList}
        screenOptions={{
          headerStyle: headingContainer,
          headerTitleStyle: formLabel,
        }}>
        <Stack.Screen
          name={booksList}
          component={BooksList}
          options={{title: 'ALL BOOKS'}}
        />
        <Stack.Screen name={libraryForm} component={Form} />
        <Stack.Screen name={showBookDetails} component={ShowBook} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
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

export default AuthNavigators;
