import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {calculateDistance} from 'helpers/application';

const defaultObj = {};

const BookDistance = ({labelStyle, valueStyle, location, currentLocation}) => {
  const {latitude: endLat, longitude: endLong} = location || defaultObj;
  const {lat: startLat, long: startLong} = currentLocation || defaultObj;
  const locations = {
    startLocation: {startLat, startLong},
    endLocation: {endLat, endLong},
  };
  const isValidDistance = Math.abs(startLat) > 0 && Math.abs(startLong) > 0;
  const distance = isValidDistance && calculateDistance(locations);
  return (
    isValidDistance && (
      <View>
        <Text style={labelStyle}>Distance: </Text>
        <Text style={valueStyle}>{distance}</Text>
      </View>
    )
  );
};

function mapStateToProps({library: {currentLocation}}) {
  return {
    currentLocation,
  };
}

export default connect(mapStateToProps)(BookDistance);
