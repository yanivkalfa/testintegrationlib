import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ConfigState, UpdateConfigPayload} from '../config/types';
import {DEFAULT} from '../config/consts';

const initialState: ConfigState = {
  theme: DEFAULT,
  isOnline: true,
  isLoggedIn: true,
  isDeviceConnected: false,
  connectedDeviceName: '',
};

export const configSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    updateConfig: (state, action: PayloadAction<UpdateConfigPayload>) => {
      const {name, value} = action.payload;
      (state[name] as ConfigState[typeof name]) = value;
    },
  },
});

export const {updateConfig} = configSlice.actions;
export default configSlice.reducer;
