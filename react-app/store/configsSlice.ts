import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigState, UpdateConfigPayload } from '../config/types';

const initialState: ConfigState = {
  imgFolderCreated: false,
  isOnline: true,
  isLoggedIn: true,
};

export const configSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    updateConfig: (state: ConfigState, action: PayloadAction<UpdateConfigPayload>) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const { updateConfig } = configSlice.actions;
export default configSlice.reducer;
