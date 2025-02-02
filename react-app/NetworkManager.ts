import NetInfo from '@react-native-community/netinfo';

import {store, selectAppConfigsValue} from './store/Store';
import { updateConfig } from './store/configsSlice';

const IS_ONLINE = 'isOnline';

NetInfo.addEventListener((state) => {
  const isOnline = selectAppConfigsValue(store.getState(), IS_ONLINE);
  if(isOnline !== state.isConnected) {
    store.dispatch(updateConfig({name: IS_ONLINE, value: !!state.isConnected}));
  }
});