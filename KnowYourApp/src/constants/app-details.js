export const AppDetails = {
  appName: {
    key: 'appName',
    label: 'App Name',
    api: 'getApplicationName',
  },
  version: {
    key: 'version',
    label: 'Version',
    api: 'getVersion',
  },
  buildNumber: {
    key: 'buildNumber',
    label: 'Build Number',
    api: 'getBuildNumber',
  },
  deviceType: {
    key: 'deviceType',
    label: 'Device Type',
    api: 'getDeviceType',
  },
  serialNumber: {
    key: 'serialNumber',
    label: 'Serial Number',
    api: 'getSerialNumber',
    isPromise: true
  },
};