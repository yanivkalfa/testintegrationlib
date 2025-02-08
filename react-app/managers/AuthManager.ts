import PublicClientApplication, {
  MSALConfiguration,
  MSALAccount,
} from 'react-native-msal';

import {store} from '../store/Store';
import {updateConfig} from '../store/configsSlice';
import {getMySites} from '../api/sitesApi';
import {setSiteId} from './SitesManager';
import {MSAL_SCOPE} from '../config/consts';
import {isDeviceActive} from './DeviceManager';
import {sendLoginNotification} from './NotificationManager';

let authClient: PublicClientApplication;

const config: MSALConfiguration = {
  auth: {
    clientId: '425c9360-3599-44c7-ab16-d6c38c8e522d',
    redirectUri:
      'msauth://com.integrationtestlibs/WyEZR%2BsYSPIRoWZwQRoaNzh0qHY%3D',
    authority:
      'https://login.microsoftonline.com/78820852-55fa-450b-908d-45c0d911e76b',
    knownAuthorities: [
      'https://login.microsoftonline.com/78820852-55fa-450b-908d-45c0d911e76b',
    ],
  },
};

export const getAuthClient = () => {
  return authClient;
};

export const getAccounts = async () => {
  return authClient.getAccounts();
};

export const updateIsLoggedIn = async (isLoggedIn: boolean) => {
  if (isLoggedIn) {
    try {
      const mySites = await getMySites();
      const siteId = mySites[0].id.toString();
      console.log('mySites, siteId', mySites, siteId);
      setSiteId(siteId);
    } catch (err) {
      console.log('errerr', err);
    }
  }
  store.dispatch(updateConfig({name: 'isLoggedIn', value: isLoggedIn}));
};

export const initClientMsal = async (): Promise<void> => {
  authClient = new PublicClientApplication(config);
  await authClient.init();
};

export const getAccessToken = async (): Promise<string | null> => {
  const accounts = await authClient.getAccounts();
  if (accounts.length > 0) {
    const account: MSALAccount = accounts[0];
    try {
      const tokenResponse = await authClient.acquireTokenSilent({
        scopes: [MSAL_SCOPE],
        account,
        forceRefresh: true,
      });

      if (tokenResponse) {
        return tokenResponse.accessToken;
      } else {
        console.error('Token response is undefined.');
      }
    } catch (e) {
      console.log('Silent token acquisition failed', e);
    }
  }

  return null;
};

export const login = async (): Promise<string | null> => {
  if (!(await isDeviceActive())) {
    sendLoginNotification();
    return null;
  }

  try {
    const tokenResponse = await authClient.acquireToken({
      scopes: [MSAL_SCOPE],
    });

    if (tokenResponse) {
      await updateIsLoggedIn(true);
      return tokenResponse.accessToken;
    } else {
      console.log('Interactive token response is undefined.');
      return null;
    }
  } catch (e) {
    console.log('Interactive login failed.', e);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const accounts = await authClient.getAccounts();

    if (accounts.length > 0) {
      const account: MSALAccount = accounts[0];
      await authClient.signOut({account});
      console.log('logout successfully');
      updateIsLoggedIn(false);
    } else {
      console.error('No accounts detected to logout.');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};
