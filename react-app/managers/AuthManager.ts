import PublicClientApplication, {
  MSALConfiguration,
  MSALAccount,
} from 'react-native-msal';

import {store } from '../store/Store';
import { updateConfig } from '../store/configsSlice';
import { getMySites } from '../api/SitesApi';
import { setSiteId } from './SitesManager';

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

const updateIsLoggedIn = async (isLoggedIn: boolean) => {
  const mySites = await getMySites();
  console.log('mySites', mySites);
  const siteId = mySites[0].id.toString();
  setSiteId(siteId);
  store.dispatch(updateConfig({name: "isLoggedIn", value: isLoggedIn}));
};

export const initClientMsal = async (): Promise<void> => {
  authClient = new PublicClientApplication(config);
  await authClient.init();
};

export const getAccessToken = async (): Promise<string | null> => {
  const accounts = await authClient.getAccounts();

  if (accounts.length === 0) {
    console.log('No accounts detected. Requiring login.');
    try {
      const tokenResponse = await authClient.acquireToken({
        scopes: ['api://tik-chalal-dev/all'],
      });

      if (tokenResponse) {
        await updateIsLoggedIn(true);
        return tokenResponse.accessToken;
      } else {
        console.error('Interactive token response is undefined.');
        return null;
      }
    } catch (interactiveError) {
      await updateIsLoggedIn(false);
      console.error('Interactive login failed.', interactiveError);
      return null;
    }
  }

  const account: MSALAccount = accounts[0];
  try {
    const tokenResponse = await authClient.acquireTokenSilent({
      scopes: ['api://tik-chalal-dev/all'],
      account,
    });

    if (tokenResponse) {
      await updateIsLoggedIn(true);
      return tokenResponse.accessToken;
    } else {
      await updateIsLoggedIn(false);
      console.error('Token response is undefined.');
      return null;
    }
  } catch (silentError) {
    console.error('Silent token acquisition failed, attempting interactive login.', silentError);

    try {
      const tokenResponse = await authClient.acquireToken({
        scopes: ['api://tik-chalal-dev/all'],
      });

      if (tokenResponse) {
        await updateIsLoggedIn(true);
        return tokenResponse.accessToken;
      } else {
        await updateIsLoggedIn(false);
        console.error('Interactive token response is undefined.');
        return null;
      }
    } catch (interactiveError) {
      console.error('Interactive login failed.', interactiveError);
      await updateIsLoggedIn(false);
      return null;
    }
  }
};


export const logout = async (): Promise<void> => {
  try {
    const accounts = await authClient.getAccounts();

    if (accounts.length > 0) {
      const account: MSALAccount = accounts[0];
      await authClient.signOut({ account });
      updateIsLoggedIn(false);
    } else {
      console.error('No accounts detected to logout.');
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const isUserLogged = async (): Promise<boolean> => {
  const accounts = await authClient.getAccounts();
  return accounts.length > 0;
};
