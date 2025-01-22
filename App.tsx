import React, { useState, useEffect } from 'react';
import {
  NativeModules,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';

const { ScannerModule } = NativeModules;

// Listen for native logs
DeviceEventEmitter.addListener('onNativeLog', (event) => {
  console.log(`NATIVELOG: ${event.log}`);
});

function App(): React.JSX.Element {
  const [isConnected, setIsConnected] = useState(false); // Tracks device connection
  const [scanStatus, setScanStatus] = useState('Idle'); // Placeholder for scan status

  useEffect(() => {
    // Listener for device connected
    const onDeviceConnectedListener = DeviceEventEmitter.addListener(
      'onDeviceConnected',
      (message) => {
        console.log(message); // Log the message
        //setScanStatus('Device Connected');
      }
    );

    // Listener for device disconnected
    const onDeviceDisconnectedListener = DeviceEventEmitter.addListener(
      'onDeviceDisconnected',
      (message) => {
        console.log(message); // Log the message
        //setScanStatus('Device Disconnected');
        setIsConnected(false);
      }
    );

    // Listener for permission granted
    const onPermissionGrantedListener = DeviceEventEmitter.addListener(
      'onPermissionGranted',
      (message) => {
        console.log(message); // Log the message
        setIsConnected(true); // Device is connected and permission granted
      }
    );

    // Listener for permission denied
    const onPermissionDeniedListener = DeviceEventEmitter.addListener(
      'onPermissionDenied',
      (message) => {
        console.log(message); // Log the message
        setIsConnected(false); // Device connected but permission denied
      }
    );

    // Cleanup listeners on component unmount
    return () => {
      onDeviceConnectedListener.remove();
      onDeviceDisconnectedListener.remove();
      onPermissionGrantedListener.remove();
      onPermissionDeniedListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Connection Indicator */}
      <View
        style={[
          styles.connectionBox,
          { backgroundColor: isConnected ? 'green' : 'red' },
        ]}
      />
      <Text style={styles.statusText}>
        {isConnected ? 'Device Connected' : 'Device Disconnected'}
      </Text>

      {/* Placeholder for Fingerprint Display */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Fingerprint Preview</Text>
      </View>

      {/* Scan Status */}
      <Text style={styles.scanStatusText}>{scanStatus}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  connectionBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeholder: {
    width: '80%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  scanStatusText: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
  },
});

export default App;
