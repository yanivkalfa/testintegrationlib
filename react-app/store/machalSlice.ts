import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  Fingerprint,
  Machal,
  CaseType,
  ViewedStatus,
  SyncStatus,
} from '../config/types';
import {getRandomIDNumber} from '../utils/math.utils';
import {FINGERS} from '../config/consts';
import {deleteFile} from '../managers/FileManager';

const initialDefaultState: Partial<Machal> = {
  caseType: CaseType.Machal,
  syncStatus: SyncStatus.NEED_SYNC,
  viewStatus: ViewedStatus.NEW,
  syncAttemts: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  scannerId: 'watson 17 e',
  fingers: {},
};

const initialState: Partial<Machal> = {...initialDefaultState};

export const machalsSlice = createSlice({
  name: 'machals',
  initialState,
  reducers: {
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
      return {...initialDefaultState};
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
              await deleteFile(fingerPrint.storageFileName);
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

    dispatch(resetMachal());
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
          await deleteFile(fingerPrint.storageFileName);
        } catch (error) {
          console.warn(
            `Failed to delete fingerprint file: ${fingerPrint.storageFileName}`,
            error,
          );
        }
      }

      dispatch(removeFingerPrintForNewMachal(fingerIndex));
    }
  },
);

export const {
  updateCurrentMachal,
  resetMachal,
  addOrUpdateFingerPrintForNewMachal,
  removeFingerPrintForNewMachal,
} = machalsSlice.actions;

export {resetMachalThunk, removeFingerPrintForNewMachalThunk};

export default machalsSlice.reducer;
