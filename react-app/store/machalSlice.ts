import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FingerPrint, Machal, MachalType } from '../config/types';
import { getRandomIDNumber } from '../utils/math.utils';
import RNFS from 'react-native-fs';

const initialState: Partial<Machal> = {};

// Slice definition
export const machalsSlice = createSlice({
  name: 'machals',
  initialState,
  reducers: {
    startMachal: (state, action: PayloadAction<{ type: MachalType }>) => {
      state.id = getRandomIDNumber().toString();
      state.type = action.payload.type;
      state.serverSyncStatus = 'needSync';
      state.viewStatus = 'new';
      state.createdAt = new Date().toISOString();
      state.updatedAt = state.createdAt;
      state.fingers = {};
    },
    updateCurrentMachal: (state, action: PayloadAction<Partial<Omit<Machal, 'fingers'>>>) => {
      return {
        ...state,
        ...action.payload,
        updatedAt: new Date().toISOString(),
      };
    },
    cancelMachal: (state) => {
      return {};
    },
    addOrUpdateFingerPrint: (state, action: PayloadAction<{ fingerIndex: number; fingerPrint: FingerPrint }>) => {
      const { fingerIndex, fingerPrint } = action.payload;
      if (state.fingers) {
        state.fingers[fingerIndex] = fingerPrint;
        state.updatedAt = new Date().toISOString();
        console.log(`Fingerprint added/updated: ${fingerIndex}`);
      } else {
        console.warn('No Machal initialized to add fingerprints.');
      }
    },
    removeFingerPrint: (state, action: PayloadAction<number>) => {
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

const cancelMachalThunk = createAsyncThunk(
  'machals/cancelMachalThunk',
  async (_, { dispatch, getState }) => {
    const state = getState() as { machals: Partial<Machal> };
    const { fingers } = state.machals;

    if (fingers) {
      await Promise.all(
        Object.values(fingers).map(async (fingerPrint) => {
          if (fingerPrint?.storageFileName) {
            try {
              await RNFS.unlink(fingerPrint.storageFileName);
            } catch (error) {
              console.warn(`Failed to delete fingerprint file: ${fingerPrint.storageFileName}`, error);
            }
          }
        })
      );
    }

    dispatch(cancelMachal());
  }
);

const removeFingerPrintThunk = createAsyncThunk(
  'machals/removeFingerPrintThunk',
  async (fingerIndex: number, { dispatch, getState }) => {
    const state = getState() as { machals: Partial<Machal> };
    const { fingers } = state.machals;

    if (fingers && fingers[fingerIndex]) {
      const fileName = fingers[fingerIndex]?.storageFileName;
      if (fileName) {
        try {
          await RNFS.unlink(fileName);
          console.log(`Deleted fingerprint file: ${fileName}`);
        } catch (error) {
          console.warn(`Failed to delete fingerprint file: ${fileName}`, error);
        }
      }

      dispatch(removeFingerPrint(fingerIndex));
    } else {
      console.warn(`Fingerprint not found for index: ${fingerIndex}`);
    }
  }
);

export const {
  startMachal,
  updateCurrentMachal,
  cancelMachal,
  addOrUpdateFingerPrint,
  removeFingerPrint,
} = machalsSlice.actions;

export {
  cancelMachalThunk,
  removeFingerPrintThunk,
};

export default machalsSlice.reducer;
