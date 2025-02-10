import {NativeModules, DeviceEventEmitter} from 'react-native';

import {selectAppConfigsValue, store} from '../store/store';
import {updateConfig} from '../store/configsSlice';
const {ScannerModule} = NativeModules;

const updateScannerIsConnected = (value: boolean) => {
  store.dispatch(updateConfig({name: 'isDeviceConnected', value}));
};
DeviceEventEmitter.addListener('onDeviceDisconnected', () => {
  console.log('onDeviceDisconnectedListener');
  updateScannerIsConnected(false);
});

DeviceEventEmitter.addListener('onPermissionDenied', () => {
  console.log('onPermissionDeniedListener');
  updateScannerIsConnected(false);
});

DeviceEventEmitter.addListener('onDeviceReadyForScanning', (value: string) => {
  console.log('onDeviceReadyForScanning', value);
  updateScannerIsConnected(true);
  store.dispatch(updateConfig({name: 'connectedDeviceName', value}));
});

export const beginCaptureImage = () => {
  const isDeviceConnected = selectAppConfigsValue(
    store.getState(),
    'isDeviceConnected',
  );
  if (!isDeviceConnected) {
    return false;
  }
  ScannerModule.beginCaptureImage();
};

export const cancelCaptureImage = () => {
  const isDeviceConnected = selectAppConfigsValue(
    store.getState(),
    'isDeviceConnected',
  );
  if (!isDeviceConnected) {
    return false;
  }
  ScannerModule.cancelCaptureImage();
};

export const checkConnectedDevicesPermissions = () => {
  ScannerModule.checkConnectedDevicesPermissions();
};
