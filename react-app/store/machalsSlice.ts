import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Fingerprint, Machal, Machals} from '../config/types';
import {FINGERS} from '../config/consts';

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
        state.splice(index, 1);
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

export const {
  addMachal,
  updateMachal,
  deleteMachal,
  addOrUpdateFingerPrint,
  removeFingerPrint,
} = machalsSlice.actions;

export default machalsSlice.reducer;
