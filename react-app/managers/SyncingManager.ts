import {NativeModules, DeviceEventEmitter} from 'react-native';
import {store, selectUnsyncedMachals} from '../store/store';
import {Machal, Machals, SyncStatus} from '../config/types';
import {updateMachal} from '../store/machalsSlice';
import {prepareStateToSend} from '../utils/general.utils';
import {upsertCase} from '../api/fingerprintApi';

const {Scheduler} = NativeModules;
let isRunning = false;

const updateMachalSyncStatus = async (
  id: string,
  updatedMachal: Partial<Machal>,
) => {
  store.dispatch(updateMachal({id, updatedMachal}));
};

const EVENT_NAME = 'SchedulerEvent';
const syncMachals = async () => {
  console.log('Inside syncMachals - isRunning:', isRunning);
  if (isRunning) {
    return false;
  }
  isRunning = true;
  console.log('Sync happening: ');
  //return false;
  const state = store.getState();
  const unSyncedMachals: Machals = selectUnsyncedMachals(state);
  for (const machal of unSyncedMachals) {
    console.log('Syncing machal: ', machal.id);
    try {
      const data = await prepareStateToSend(machal);
      //console.log('data', data);
      updateMachalSyncStatus(machal.id, {
        syncStatus: SyncStatus.SYNC_IN_PROGRESS,
        updatedAt: new Date().toISOString(),
      });
      const response = await upsertCase(machal.id, data);
      console.log('updating state to: SYNCED');
      updateMachalSyncStatus(machal.id, {
        syncStatus: SyncStatus.SYNCED,
        updatedAt: new Date().toISOString(),
      });
    } catch (error: any) {
      console.log('ERROR'); //, error);
      if (error.code === 'ECONNABORTED') {
        console.log('updating state to: NEED_SYNC');
        updateMachalSyncStatus(machal.id, {
          syncStatus: SyncStatus.NEED_SYNC,
          syncAttemts: machal.syncAttemts + 1,
          updatedAt: new Date().toISOString(),
        });
      } else {
        console.log('updating state to: SYNC_FAILED');
        updateMachalSyncStatus(machal.id, {
          syncStatus: SyncStatus.SYNC_FAILED,
          updatedAt: new Date().toISOString(),
          syncFailedReason: error.message || JSON.stringify(error),
        });
      }
    }
  }
  isRunning = false;
};
DeviceEventEmitter.addListener(EVENT_NAME, syncMachals);

export const checkSyncStatus = (
  isOnline: boolean,
  isLoggedIn: boolean,
  unSyncedMachals: Machals,
): void => {
  console.log(
    '!isOnline || !isLoggedIn || unSyncedMachals.length',
    isOnline,
    isLoggedIn,
    unSyncedMachals.length,
  );

  if (!isOnline || !isLoggedIn || unSyncedMachals.length <= 0) {
    Scheduler.stopService();
    console.log('Stopping Sync Service');
    return;
  }

  console.log('Starting Sync Service');
  Scheduler.startService();
};
