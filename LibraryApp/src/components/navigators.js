import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  booksList,
  libraryForm,
  showBookDetails,
  scanQRCode,
} from 'constants/navigators';
import {Global, Colors, Typography} from 'stylesheets';
import {navigationRef} from 'helpers/navigation';
import Form from 'components/form';
import BooksList from 'components/books-list';
import ShowBook from 'components/show-book';
import ScanCode from 'components/shared/scan-code';

const {textCenter} = Global;
const {fs18, bold, uppercase} = Typography;
const {lightBlue, purple} = Colors;

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MainScreens = () => {
  const {headingContainer, formLabel} = styles;
  return (
    <MainStack.Navigator
      initialRouteName={booksList}
      screenOptions={{
        headerStyle: headingContainer,
        headerTitleStyle: formLabel,
      }}>
      <MainStack.Screen
        name={booksList}
        component={BooksList}
        options={{title: 'ALL BOOKS'}}
      />
      <MainStack.Screen name={libraryForm} component={Form} />
      <MainStack.Screen name={showBookDetails} component={ShowBook} />
    </MainStack.Navigator>
  );
};

const Navigators = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainScreens} />
        <RootStack.Screen name={scanQRCode} component={ScanCode} />
      </RootStack.Navigator>
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

export default Navigators;
