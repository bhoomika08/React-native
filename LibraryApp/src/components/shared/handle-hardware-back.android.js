import {useEffect, useState} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import {getCurrentRoute, navigate} from 'helpers/navigation';
import {booksList, libraryForm} from 'constants/navigators';

const exitTime = 2000; // 2 seconds to tap second-time

const HandleHardwareBack = (props) => {
  const {message = 'Tap again to exit app'} = props;
  const [exitApp, setExitApp] = useState(0);
  const currentRouteName = getCurrentRoute();

  const doubleTapExit = () => {
    setTimeout(() => {
      setExitApp(0);
    }, exitTime);

    if (exitApp === 0) {
      setExitApp(exitApp + 1);
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };

  const navigateToListing = () => {
    navigate(booksList);
    return true;
  };

  getBackAction = () => {
    switch (currentRouteName) {
      case booksList:
        return doubleTapExit;
      case libraryForm:
        return navigateToListing;
      default:
        return doubleTapExit;
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      getBackAction(),
    );
    return () => backHandler.remove();
  });
  return null;
};

export default HandleHardwareBack;
