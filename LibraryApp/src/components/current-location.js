import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {Colors, Global, Spacing, Typography} from 'stylesheets';
import PermissionService from 'services/permissions';
import {setCurrentLocation} from 'store/actions/library';
import {refresh} from 'constants/icons';
import {LocationStatus} from 'constants/location-status';

const isIOSPlatform = Platform.OS == 'ios';
const {rowFlex, spaceBetween, verticalCenter} = Global;
const {iconFont, fs16, bold} = Typography;
const {p20, px10} = Spacing;
const {blue, darkGrey, skyBlue} = Colors;
const {loading, loaded, denied} = LocationStatus;

const defaultObj = {};

const LocationOptions = {
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

const CurrentLocation = (props) => {
  const [locationStatus, setLocationStatus] = useState('');
  let watchID;

  useEffect(() => {
    requestLocationPermission();
    return () => {
      if (watchID >= 0) {
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
    setLocationStatus(loading);
    Geolocation.getCurrentPosition(
      // ------ Will give you the current location ------ //
      (position) => {
        onLocationSuccess(position);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      LocationOptions.currentLocation,
    );
  };

  // ---------- Will give you the location on location change --------- //
  const subscribeLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        onLocationSuccess(position);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      LocationOptions.subscribeLocation,
    );
  };

  onLocationSuccess = (position) => {
    const {setCurrentLocation} = props;
    setLocationStatus(loaded);
    const currentLongitude = JSON.stringify(position.coords.longitude);
    const currentLatitude = JSON.stringify(position.coords.latitude);
    setCurrentLocation(currentLatitude, currentLongitude);
  };

  const {currentLocation} = props;
  const {lat: currentLatitude, long: currentLongitude} =
    currentLocation || defaultObj;
  const {refreshIcon, locationContainer, locationStatusText} = styles;
  const isLoading = locationStatus == loading;
  return (
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
          <Text style={refreshIcon}>{refresh}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  refreshIcon: {
    ...iconFont,
    color: darkGrey,
    ...px10,
  },
  locationContainer: {
    ...rowFlex,
    ...spaceBetween,
    ...p20,
    backgroundColor: skyBlue,
  },
  locationStatusText: {
    ...bold,
    ...fs16,
    color: blue,
  },
});

function mapStateToProps({library: {currentLocation}}) {
  return {
    currentLocation,
  };
}

const mapDispatchToProps = {
  setCurrentLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLocation);
