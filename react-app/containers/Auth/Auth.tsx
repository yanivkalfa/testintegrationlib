import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import PublicClientApplication, {
  MSALConfiguration,
  MSALResult,
} from 'react-native-msal';

import {styles} from './Auth.styles';

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

const Auth: React.FC = () => {
  const [pca, setPca] = useState<PublicClientApplication | null>(null);
  const [result, setResult] = useState<MSALResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize PublicClientApplication
    const initializePCA = async () => {
      try {
        const client = new PublicClientApplication(config);
        await client.init();
        setPca(client);
      } catch (err: any) {
        console.error('MSAL initialization error:', err);
        setError(err.message || 'Error initializing MSAL.');
      }
    };

    initializePCA();
  }, []);

  const handleLogin = async () => {
    if (!pca) {
      setError('MSAL client is not initialized.');
      return;
    }

    try {
      const authResult = await pca.acquireToken({
        scopes: ['api://tik-chalal-dev/all'],
      });

      if (authResult) {
        setResult(authResult);
      } else {
        setError('No token was returned.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Error during login.');
    }
  };

  const handleLogout = async () => {
    if (!pca) {
      setError('MSAL client is not initialized.');
      return;
    }

    try {
      if (result?.account) {
        await pca.signOut({account: result.account});
        setResult(null);
        setError(null);
      } else {
        setError('No account is logged in.');
      }
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Error during logout.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login with MSAL" onPress={handleLogin} />
      {result && (
        <View style={styles.infoContainer}>
          <Text style={styles.text}>Welcome, {result.account.username}</Text>
          <Text style={styles.text}>Access Token: {result.accessToken}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Auth;
