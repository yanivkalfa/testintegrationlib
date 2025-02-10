import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {Fingerprint, Machal, Machals} from '../config/types';
import {FINGERS} from '../config/consts';
import {deleteFile} from '../managers/FileManager';

const initialState: Machals = [];

export const machalsSlice = createSlice({
  name: 'machals',
  initialState,
  reducers: {
    addMachal: (state, action: PayloadAction<Machal>) => {
      const exists = state.some(machal => machal.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    updateMachal: (
      state,
      action: PayloadAction<{id: string; updatedMachal: Partial<Machal>}>,
    ) => {
      const index = state.findIndex(machal => machal.id === action.payload.id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...action.payload.updatedMachal,
          updatedAt: new Date().toISOString(),
        };
      } else {
        console.warn(
          `Machal with id "${action.payload.id}" not found. Update operation skipped.`,
        );
      }
    },
    deleteMachal: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(machal => machal.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1); // Remove the machal from the state
      } else {
        console.warn(
          `Machal with id "${action.payload}" not found. Delete operation skipped.`,
        );
      }
    },
    addOrUpdateFingerPrint: (
      state,
      action: PayloadAction<{
        id: string;
        fingerIndex: keyof typeof FINGERS;
        fingerPrint: Fingerprint;
      }>,
    ) => {
      const {id, fingerIndex, fingerPrint} = action.payload;
      const machal = state.find(machal => machal.id === id);
      if (machal) {
        if (!machal.fingers) {
          machal.fingers = {};
        }
        machal.fingers[fingerIndex] = fingerPrint;
        machal.updatedAt = new Date().toISOString();
      } else {
        console.warn(
          `Machal with id "${id}" not found. FingerPrint operation skipped.`,
        );
      }
    },
    removeFingerPrint: (
      state,
      action: PayloadAction<{id: string; fingerIndex: keyof typeof FINGERS}>,
    ) => {
      const {id, fingerIndex} = action.payload;
      const machal = state.find(machal => machal.id === id);
      if (machal && machal.fingers && machal.fingers[fingerIndex]) {
        delete machal.fingers[fingerIndex];
        machal.updatedAt = new Date().toISOString();
      } else if (machal) {
        console.warn(
          `FingerPrint with index "${fingerIndex}" not found for Machal with id "${id}".`,
        );
      } else {
        console.warn(
          `Machal with id "${id}" not found. FingerPrint removal operation skipped.`,
        );
      }
    },
  },
});

export const deleteMachalThunk = createAsyncThunk(
  'machals/deleteMachal',
  async (id: string, {dispatch, getState}) => {
    const state = getState() as {machals: Machals};
    const machal = state.machals.find(machal => machal.id === id);

    if (machal && machal.fingers) {
      await Promise.all(
        Object.values(machal.fingers).map(async fingerPrint => {
          if (
            typeof fingerPrint === 'object' &&
            'storageFileName' in fingerPrint &&
            fingerPrint.storageFileName
          ) {
            try {
              await deleteFile(fingerPrint.storageFileName);
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
        }),
      );
    }
    dispatch(deleteMachal(id));
  },
);

export const {
  addMachal,
  updateMachal,
  deleteMachal,
  addOrUpdateFingerPrint,
  removeFingerPrint,
} = machalsSlice.actions;

export default machalsSlice.reducer;
