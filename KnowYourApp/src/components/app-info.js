import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import DeviceInfo from 'react-native-device-info';
import {AppDetails} from 'constants/app-details';

const AppInfo = () => {
  useEffect(() => {
    getDeviceData();
  }, []);
  const [deviceInfo, setAsyncDeviceInfo] = useState({});
  const getDeviceData = async () => {
    const allDeviceInfo = {};
    Object.values(AppDetails).map(
      async ({key, api, isPromise}) =>
        !isPromise && (allDeviceInfo[key] = DeviceInfo[api]()),
    );
    allDeviceInfo.serialNumber = await DeviceInfo.getSerialNumber();
    setAsyncDeviceInfo(allDeviceInfo);
  };
  const {scrollView, body, sectionContainer, sectionTitle} = styles;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={scrollView}>
      <Header />
      <View style={body}>
        {Object.keys(deviceInfo).map((info) => (
          <View style={sectionContainer} key={info}>
            <Text style={sectionTitle}>
              {AppDetails[info].label}: {deviceInfo[info]}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default AppInfo;
