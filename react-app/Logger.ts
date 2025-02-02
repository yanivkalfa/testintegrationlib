import {DeviceEventEmitter} from 'react-native';

DeviceEventEmitter.addListener('onNativeLog', event => {
  console.log(`NATIVELOG: ${event.log}`);
});

