import {
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

import {store, persistor} from './store/Store';

const EVENT_NAME = 'SchedulerEvent';
const syncBodies = (event: string) => {
  const state = store.getState();
  //store.dispatch(updateEntry(key, value));

  console.log('event', event);
};


console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
DeviceEventEmitter.addListener(EVENT_NAME, syncBodies);

// todo save images to files