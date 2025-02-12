import {
  NativeModules,
  DeviceEventEmitter,
  AppState,
  AppStateStatus,
} from 'react-native';

const {ScreenState} = NativeModules;

import {store, selectAppConfigsValue} from '../store/store';
import {updateConfig} from '../store/configsSlice';

const EVENT_NAME = 'ScreenStateChanged';
const updateScreenStatus = async () => {};
DeviceEventEmitter.addListener(EVENT_NAME, updateScreenStatus);

const handleAppStateChange = (nextAppState: AppStateStatus) => {
  if (nextAppState === 'active') {
  }
};
AppState.addEventListener('change', handleAppStateChange);

export const isAppActive = async (): Promise<boolean> => {
  return AppState.currentState === 'active';
};

export const isScreenOn = async (): Promise<boolean> => {
  try {
    return await ScreenState.isScreenOn();
  } catch (error) {
    console.error('Error checking screen state:', error);
    return false;
  }
};

export const isDeviceActive = async (): Promise<boolean> => {
  const screenOn = await isScreenOn();
  const appActive = await isAppActive();
  return screenOn && appActive;
};
