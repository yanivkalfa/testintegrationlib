import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Fingerprint, FingerFile, Machal, MachalType} from '../config/types';
import {getRandomIDNumber} from '../utils/math.utils';
import RNFS from 'react-native-fs';
import {FINGERS} from '../config/consts';

const initialState: Partial<Machal> = {};

export const machalsSlice = createSlice({
  name: 'machals',
  initialState,
  reducers: {
    startMachal: (state, action: PayloadAction<{type: MachalType}>) => {
      state.id = getRandomIDNumber().toString();
      state.type = action.payload.type;
      state.serverSyncStatus = 'needSync';
      state.viewStatus = 'new';
      state.createdAt = new Date().toISOString();
      state.updatedAt = state.createdAt;
      state.fingers = {};
    },
    updateCurrentMachal: (
      state,
      action: PayloadAction<Partial<Omit<Machal, 'fingers'>>>,
    ) => {
      return {
        ...state,
        ...action.payload,
        updatedAt: new Date().toISOString(),
      };
    },
    resetMachal: () => {
      return {};
    },
    addOrUpdateFingerPrintForNewMachal: (
      state,
      action: PayloadAction<{
        fingerIndex: keyof typeof FINGERS;
        fingerPrint: Fingerprint;
      }>,
    ) => {
      const {fingerIndex, fingerPrint} = action.payload;
      if (!state.fingers) {
        state.fingers = {};
      }
      state.fingers[fingerIndex] = fingerPrint; // Update or add the fingerprint
      state.updatedAt = new Date().toISOString();
      console.log(`Fingerprint added/updated: ${fingerIndex}`);
    },
    removeFingerPrintForNewMachal: (
      state,
      action: PayloadAction<keyof typeof FINGERS>,
    ) => {
      const fingerIndex = action.payload;
      if (state.fingers && state.fingers[fingerIndex]) {
        delete state.fingers[fingerIndex];
        state.updatedAt = new Date().toISOString();
        console.log(`Fingerprint removed: ${fingerIndex}`);
      } else {
        console.warn(`Fingerprint not found for index: ${fingerIndex}`);
      }
    },
  },
});

const resetMachalThunk = createAsyncThunk(
  'machals/cancelMachalThunk',
  async (_, {dispatch, getState}) => {
    const state = getState() as {machals: Partial<Machal>};
    const {fingers} = state.machals;

    if (fingers) {
      await Promise.all(
        Object.values(fingers).map(async fingerPrint => {
          if (
            typeof fingerPrint === 'object' &&
            'storageFileName' in fingerPrint &&
            fingerPrint.storageFileName
          ) {
            try {
              await RNFS.unlink(fingerPrint.storageFileName);
            } catch (error) {
              console.warn(
                `Failed to delete fingerprint file: ${fingerPrint.storageFileName}`,
                error,
              );
            }
          }
        }),
      );
    }

    dispatch(machalsSlice.actions.resetMachal());
  },
);

const removeFingerPrintForNewMachalThunk = createAsyncThunk(
  'machals/removeFingerPrintForNewMachalThunk',
  async (fingerIndex: keyof typeof FINGERS, {dispatch, getState}) => {
    const state = getState() as {machals: Partial<Machal>};
    const {fingers} = state.machals;

    if (fingers && fingers[fingerIndex]) {
      const fingerPrint = fingers[fingerIndex];
      if (
        typeof fingerPrint === 'object' &&
        'storageFileName' in fingerPrint &&
        fingerPrint.storageFileName
      ) {
        try {
          await RNFS.unlink(fingerPrint.storageFileName);
          console.log(
            `Deleted fingerprint file: ${fingerPrint.storageFileName}`,
          );
        } catch (error) {
          console.warn(
            `Failed to delete fingerprint file: ${fingerPrint.storageFileName}`,
            error,
          );
        }
      }

      dispatch(machalsSlice.actions.removeFingerPrintForNewMachal(fingerIndex));
    } else {
      console.warn(`Fingerprint not found for index: ${fingerIndex}`);
    }
  },
);

export const {
  startMachal,
  updateCurrentMachal,
  resetMachal,
  addOrUpdateFingerPrintForNewMachal,
  removeFingerPrintForNewMachal,
} = machalsSlice.actions;

export {resetMachalThunk, removeFingerPrintForNewMachalThunk};

export default machalsSlice.reducer;
