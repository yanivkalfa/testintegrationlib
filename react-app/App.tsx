import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor, selectMachal} from './store/store';
import {RootStackParamList} from './config/types';

import Home from './containers/Home/Home';
import Atzada from './containers/Atzada/Atzada';
import Details from './containers/Details/Details';
import ScanModeSelector from './containers/ScanModeSelector/ScanModeSelector';
import ScanFingerPrintSelector from './containers/ScanFingerPrintSelector/ScanFingerPrintSelector';
import ScanFinger from './containers/ScanFinger/ScanFinger';

import './managers/ScannerManager';
import './managers/SyncMachalsManager';
import './managers/NetworkManager';
import './managers/AuthManager';
import './Logger';
import {ThemeProvider} from './theme/context/theme.provider';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['mezah://', 'msauth://com.integrationtestlibs'],
  config: {
    screens: {
      Home: '',
      Atzada: 'atzada',
      Details: 'details',
      ScanModeSelector: 'ScanModeSelector',
      ScanFingerPrintSelector: 'ScanFingerPrintSelector',
      ScanFinger: 'ScanFinger',
    },
  },
};

const TesterChoice: React.FC = () => {
  const currentMachal = useSelector(selectMachal);
  console.log('currentMachal', currentMachal);
  return <></>;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <TesterChoice />
          <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Atzada" component={Atzada} />
              <Stack.Screen name="Details" component={Details} />
              <Stack.Screen
                name="ScanModeSelector"
                component={ScanModeSelector}
              />
              <Stack.Screen
                name="ScanFingerPrintSelector"
                component={ScanFingerPrintSelector}
              />
              <Stack.Screen name="ScanFinger" component={ScanFinger} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
