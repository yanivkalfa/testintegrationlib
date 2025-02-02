import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import machals from './machalsSlice';
import appConfig from './configsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { ConfigState, Machal } from '../config/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['machals', 'appConfig'],
};

const rootReducer = combineReducers({ machals, appConfig });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


const selectMachalId = (_: RootState, id: string) => id;
export const selectAppConfigsValue = (state: RootState, configName: keyof ConfigState) => state.appConfig[configName];
export const selectMachals = (state: RootState) => state.machals;
export const selectUnsyncedMachals = createSelector(
  [selectMachals],
(machals) => machals.filter((machal) => machal.serverSyncStatus === 'needSync')
);
export const selectMachalsById = createSelector(
  [selectMachals, selectMachalId],
  (machals, id) => machals.find((machal: Machal) => machal.id === id)
);