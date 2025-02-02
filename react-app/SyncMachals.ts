import {
  NativeModules,
  DeviceEventEmitter,
} from 'react-native';

const {Scheduler} = NativeModules;

import {store, selectUnsyncedMachals} from './store/Store';
import { Machal, Machals } from './config/types';
import { updateMachal } from './store/machalsSlice';

// todo: replace with real call to server
const syncMachalToServer = async (machal: Machal): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(true);
    }, 150);
  });
}

const EVENT_NAME = 'SchedulerEvent';
const syncBodies = async (event: string) => {
  const state = store.getState();
  const unSyncedMachals: Machals = selectUnsyncedMachals(state);
  console.log('Syncing...');
  for (const machal of unSyncedMachals) {
    try{
      console.log('... machal: ', machal);
      await syncMachalToServer(machal);
      store.dispatch(updateMachal({id: machal.id, updatedMachal: {serverSyncStatus: "synced"}}));
    } catch(e) {
      // check if error is 401 un authorised - then stop process and ask for relog
      // check if any other error - no internet stop processs no relog
      console.log(e);
    }
  }
};
DeviceEventEmitter.addListener(EVENT_NAME, syncBodies);

export const checkSyncStatus = (isOnline: boolean, isLoggedIn: boolean, unSyncedMachals: Machals): void => {
  if(!isOnline || !isLoggedIn || unSyncedMachals.length <= 0) {
    Scheduler.stopService();
    console.log('Stopping Sync Service');
    return;
  }

  console.log('Starting Sync Service')
  Scheduler.startService();
};