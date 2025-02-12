import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
import machals from './machalsSlice';
import machal from './machalSlice';
import appConfig from './configsSlice';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import {ConfigState, Machal, SyncStatus} from '../config/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['machals', 'machal'],
};

const rootReducer = combineReducers({machals, machal, appConfig});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
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
export const selectAppConfigsValue = (
  state: RootState,
  configName: keyof ConfigState,
) => state.appConfig[configName];
export const selectMachals = (state: RootState) => state.machals;
export const selectMachal = (state: RootState) => state.machal;
export const selectUnsyncedMachals = createSelector([selectMachals], machals =>
  machals.filter(machal => machal.syncStatus === SyncStatus.NEED_SYNC),
);
export const selectMachalsById = createSelector(
  [selectMachals, selectMachalId],
  (machals, id) => machals.find((machal: Machal) => machal.id === id),
);

export const selectMachalProp = <K extends keyof Machal>(
  state: RootState,
  property: K,
): Machal[K] | null => {
  const machal = state.machal as Machal;

  if (!machal || !(property in machal)) {
    return null;
  }
  return machal[property] ?? null;
};
