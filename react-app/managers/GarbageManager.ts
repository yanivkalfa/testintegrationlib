import {vault} from './StorageManager';
import {GARBAGE_LAST_CHECK_KEY, ONE_DAY} from '../config/consts';
import {listFiles, deleteFile} from '../managers/FileManager';
import {Machals} from '../config/types';
import {selectMachals, selectSyncedMachals, store} from '../store/store';
import {deleteMachalThunk} from '../store/machalsSlice';

export const checkAndDeleteUnusedPrints = async (): Promise<void> => {
  const files = await listFiles();
  const state = store.getState();
  const machals: Machals = selectMachals(state);

  if (!files?.length || !machals?.length) {
    console.log('No files or Machals found.');
    return;
  }

  const allFingerprints = new Set(
    machals.flatMap(machal =>
      Object.values(machal.fingers || {})
        .filter(
          finger => typeof finger === 'object' && 'storageFileName' in finger,
        )
        .map(finger => (finger as {storageFileName: string}).storageFileName),
    ),
  );

  console.log('allFingerprints', allFingerprints);
  await Promise.all(
    files.map(async file => {
      if (!allFingerprints.has(file.name)) {
        try {
          await deleteFile(file.name);
          console.log(`Deleted orphaned fingerprint file: ${file.name}`);
        } catch (error) {
          console.log(
            `Failed to delete orphaned fingerprint file: ${file.name}`,
            error,
          );
        }
      }
    }),
  );
};

export const deleteOldCases = async (): Promise<void> => {
  const state = store.getState();
  const syncedMachals: Machals = selectSyncedMachals(state);
  const THIRTY_DAYS = ONE_DAY * 30;
  const now = Date.now();

  await Promise.all(
    syncedMachals
      .filter(machal => {
        const updatedAt = new Date(machal.updatedAt).getTime();
        return now - updatedAt > THIRTY_DAYS;
      })
      .map(async machal => {
        try {
          await store.dispatch(deleteMachalThunk(machal.id)).unwrap();
        } catch (error) {
          console.log(`Failed to delete machal with ID: ${machal.id}`, error);
        }
      }),
  );
};

export const deleteOldMachalsAndUnusedPrints = async () => {
  try {
    const lastChecked = await vault.get(GARBAGE_LAST_CHECK_KEY);

    if (
      !lastChecked ||
      Date.now() >= lastChecked[GARBAGE_LAST_CHECK_KEY] + ONE_DAY
    ) {
      await Promise.all([
        checkAndDeleteUnusedPrints().catch(err =>
          console.log('Error during unused prints cleanup:', err),
        ),
        deleteOldCases().catch(err =>
          console.log('Error during old cases cleanup:', err),
        ),
      ]);
      await vault.set(GARBAGE_LAST_CHECK_KEY, {
        [GARBAGE_LAST_CHECK_KEY]: Date.now(),
      });
    }
  } catch (err) {
    console.log('Error in deleteOldMachalsAndUnusedPrints:', err);
  }
};
