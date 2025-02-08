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
      return {
        id: getRandomIDNumber().toString(),
        type: action.payload.type,
        serverSyncStatus: 'needSync',
        viewStatus: 'new',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fingers: {},
      };
    },
    updateCurrentMachal: (
      state,
      action: PayloadAction<Partial<Omit<Machal, 'fingers'>>>,
    ) => {
      return {
        ...state,
        ...action.payload,
        updatedAt: new Date().toISOString(),
        fingers: state.fingers || {}, // Ensure fingers is preserved
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
      state.fingers = {
        ...state.fingers,
        [fingerIndex]: fingerPrint, // Safely add or update the fingerprint
      };
      state.updatedAt = new Date().toISOString();
    },
    removeFingerPrintForNewMachal: (
      state,
      action: PayloadAction<keyof typeof FINGERS>,
    ) => {
      const fingerIndex = action.payload;
      if (state.fingers && fingerIndex in state.fingers) {
        const {[fingerIndex]: _, ...rest} = state.fingers; // Immutably remove the key
        state.fingers = rest;
        state.updatedAt = new Date().toISOString();
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

    if (fingers && fingerIndex in fingers) {
      const fingerPrint = fingers[fingerIndex];
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

      dispatch(machalsSlice.actions.removeFingerPrintForNewMachal(fingerIndex));
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
