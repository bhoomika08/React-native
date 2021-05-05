import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import PermissionService from 'services/permissions';
import {setSelectedBook, setCurrentLocation} from 'store/actions/library';
import {libraryForm, showBookDetails, scanQRCode} from 'constants/navigators';
import {FilterListBySearch} from 'helpers/library';
import {search, qrCode, refresh} from 'constants/icons';
import List from 'components/shared/list';
import {LocationStatus} from 'constants/location-status';
import {useHardwareBack} from 'components/custom/hardware-back';
import {CustomImage} from 'components/shared/common';

const isIOSPlatform = Platform.OS == 'ios';
const loaderTimeout = 2000;
const defaultObj = {};

const {
  flex1,
  rowFlex,
  spaceBetween,
  borderRadius20,
  horizontalCenter,
  verticalCenter,
} = Global;
const {
  comicFont,
  gochiFont,
  iconFont,
  fs16,
  fs18,
  fs20,
  fs25,
  bold,
} = Typography;
const {p10, py20, px10, px15, px25, p15, mtAuto, mb15} = Spacing;
const {blue, darkGrey, purple, lightGreen, maroon, skyBlue, white} = Colors;
const {loading, loaded, denied} = LocationStatus;

const Options = {
  currentLocation: {
    enableHighAccuracy: false,
    timeout: 30000,
    maximumAge: 1000,
  },
  subscribeLocation: {
    enableHighAccuracy: false,
    maximumAge: 1000,
    distanceFilter: 1,
  },
};

const getItemKey = (item) => `book-${item.id}`;

const BooksList = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  let watchID;

  useEffect(() => {
    requestLocationPermission();
    return () => {
      if (watchID) {
        Geolocation.clearWatch(watchID);
      }
    };
  }, []);

  const requestLocationPermission = () => {
    if (isIOSPlatform) {
      getOneTimeLocation();
      subscribeLocation();
    } else {
      PermissionService.requestAndroidLocation().then((result) => {
        if (result == 'granted') {
          getOneTimeLocation();
          subscribeLocation();
        } else {
          setLocationStatus(denied);
        }
      });
    }
  };

  const getOneTimeLocation = () => {
    const {setCurrentLocation} = props;
    setLocationStatus(loading);
    Geolocation.getCurrentPosition(
      // ------ Will give you the current location ------ //
      (position) => {
        setLocationStatus(loaded);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLocation(currentLatitude, currentLongitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      Options.currentLocation,
    );
  };

  // ---------- Will give you the location on location change --------- //
  const subscribeLocation = () => {
    const {setCurrentLocation} = props;
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus(loaded);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLocation(currentLatitude, currentLongitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      Options.subscribeLocation,
    );
  };

  onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, loaderTimeout);
  };

  selectBook = (book) => {
    const {setSelectedBook, navigation} = props;
    setSelectedBook(book);
    navigation.navigate(showBookDetails, {
      book,
    });
  };

  searchText = (value) => {
    setSearchedText(value);
  };

  addNewBook = () => {
    const {setSelectedBook} = props;
    setSelectedBook();
    navigateToForm();
  };

  navigateToForm = () => {
    const {navigation} = props;
    navigation.navigate(libraryForm);
  };

  navigateToScanner = () => {
    const {navigation} = props;
    navigation.navigate(scanQRCode);
  };

  renderItem = ({item}) => {
    const {name, author, publisher, price, image} = item;
    const {listItemContainer, listItemName, bookPrice} = styles;
    return (
      <Pressable style={listItemContainer} onPress={() => selectBook(item)}>
        <View>
          <CustomImage image={image} />
        </View>
        <View style={[flex1, px15]}>
          <Text style={listItemName}>{name}</Text>
          <Text style={[gochiFont, fs20]}>{author}</Text>
          <Text style={[gochiFont, fs18]}>{publisher}</Text>
        </View>
        <View>
          <Text style={bookPrice}>{price}</Text>
        </View>
      </Pressable>
    );
  };

  const {books, currentLocation} = props;
  const {lat: currentLatitude, long: currentLongitude} =
    currentLocation || defaultObj;
  const {
    searchContainer,
    searchIcon,
    scanIcon,
    locationContainer,
    locationStatusText,
    listContainer,
    button,
  } = styles;
  const booksArr = Object.values(books);
  const filteredList = FilterListBySearch(searchedText, booksArr);
  const containsBooks = filteredList.length > 0;
  useHardwareBack();
  const isLoading = locationStatus == loading;
  return (
    <>
      <View style={p15}>
        <View style={locationContainer}>
          <View>
            <Text style={locationStatusText}>{locationStatus}</Text>
            <Text>
              <Text style={bold}>Latitude:</Text> {currentLatitude}
            </Text>
            <Text>
              <Text style={bold}>Longitude:</Text> {currentLongitude}
            </Text>
          </View>
          {isLoading ? (
            <ActivityIndicator animating={true} color={darkGrey} size="small" />
          ) : (
            <Pressable style={verticalCenter} onPress={getOneTimeLocation}>
              <Text style={searchIcon}>{refresh}</Text>
            </Pressable>
          )}
        </View>
        <View style={searchContainer}>
          <View style={verticalCenter}>
            <Text style={searchIcon}>{search}</Text>
          </View>
          <TextInput
            value={searchedText}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={searchText}
            placeholder="Search by Book Name / Author Name"
            returnKeyType="search"
          />
        </View>
        <Pressable style={rowFlex} onPress={navigateToScanner}>
          <View style={verticalCenter}>
            <Text style={scanIcon}>{qrCode}</Text>
          </View>
          <Text style={[fs18, bold]}>Scan QR or Bar Code</Text>
        </Pressable>
      </View>
      <SafeAreaView style={listContainer}>
        <View style={px15}>
          {containsBooks ? (
            <List
              data={filteredList}
              itemKey={getItemKey}
              onRefresh={onRefresh}
              renderItem={renderItem}
              loadOnScroll
              batchCount={10}
              refreshing={isRefreshing}
            />
          ) : (
            <View style={horizontalCenter}>
              <Text>No Books Found</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
      <View style={mtAuto}>
        <Pressable style={button} onPress={addNewBook}>
          <Text style={[fs20, bold]}>ADD NEW BOOK</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    ...horizontalCenter,
  },
  title: {
    ...fs25,
    color: blue,
    ...bold,
  },
  searchContainer: {
    ...rowFlex,
    ...borderRadius20,
    backgroundColor: white,
    paddingVertical: isIOSPlatform ? 10 : 0,
    ...px10,
    ...mb15,
  },
  searchIcon: {
    ...iconFont,
    color: darkGrey,
    ...px10,
  },
  scanIcon: {
    ...iconFont,
    ...px10,
    ...fs20,
  },
  locationContainer: {
    ...rowFlex,
    ...spaceBetween,
    ...p10,
    ...mb15,
    backgroundColor: skyBlue,
  },
  locationStatusText: {
    ...bold,
    ...fs16,
    color: blue,
  },
  listContainer: {
    ...flex1,
  },
  listItemContainer: {
    ...mb15,
    backgroundColor: white,
    ...rowFlex,
    ...p10,
  },
  listItemName: {
    ...comicFont,
    ...fs18,
    color: purple,
  },
  bookPrice: {
    ...gochiFont,
    ...fs20,
    ...px25,
    color: maroon,
  },
  button: {
    ...horizontalCenter,
    backgroundColor: lightGreen,
    ...py20,
  },
});

function mapStateToProps({library: {books, currentLocation}}) {
  return {
    books,
    currentLocation,
  };
}

const mapDispatchToProps = {
  setSelectedBook,
  setCurrentLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
