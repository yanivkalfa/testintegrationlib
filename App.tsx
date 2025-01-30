import React, { useState, useEffect, useRef } from 'react';
import {
  NativeModules,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  DeviceEventEmitter,
  Image,
  Alert
} from 'react-native';
import Canvas, { Image as CanvasImage } from 'react-native-canvas';

const { ScannerModule } = NativeModules;

// Global native log listener
DeviceEventEmitter.addListener('onNativeLog', (event) => {
  console.log(`NATIVELOG: ${event.log}`);
});

const FingerprintPreview = () => {
  const canvasRef = useRef(null);
  const loadingRef = useRef(false);
  const lastImgSrc = useRef(null);

  useEffect(() => {
    const onCaptureUpdatedListener = DeviceEventEmitter.addListener(
      'onCaptureUpdated', (base64Image) => {
        if(loadingRef.current || lastImgSrc.current === base64Image) {
            return false;
        }

        lastImgSrc.current = base64Image;
        loadingRef.current = true;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const img = new CanvasImage(canvas);
        img.src = `data:image/png;base64,${base64Image}`;
        img.addEventListener('load', () => {
          context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
          context.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the image
          loadingRef.current = false;
        });
      }
    );

    // Cleanup listeners
    return () => {
      onCaptureUpdatedListener.remove();
    };
  }, []);

  return (
    <View style={styles.placeholder}>
      <Canvas ref={canvasRef} style={styles.canvas} />
    </View>
  );
};

function App(): React.JSX.Element {
  const [isReadyForScan, setIsReadyForScan] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // Tracks scanning status
  const [scanStatus, setScanStatus] = useState('Idle'); // Placeholder for scan status

  useEffect(() => {
    const onDeviceDisconnectedListener = DeviceEventEmitter.addListener(
      'onDeviceDisconnected',
      (message) => {
        console.log(message);
        setIsReadyForScan(false);
      }
    );

    const onPermissionDeniedListener = DeviceEventEmitter.addListener(
      'onPermissionDenied',
      (message) => {
        console.log(message);
        setIsReadyForScan(false);
      }
    );

    const onDeviceReadyForScanning = DeviceEventEmitter.addListener(
      'onDeviceReadyForScanning',
      (message) => {
        console.log(message);
        setIsReadyForScan(true);
      }
    );

    // Cleanup listeners on component unmount
    return () => {
      onDeviceDisconnectedListener.remove();
      onPermissionDeniedListener.remove();
      onDeviceReadyForScanning.remove();
    };
  }, []);

  const handleStartScan = () => {
    ScannerModule.beginCaptureImage();
    setScanStatus('Scanning...');
    setIsScanning(true);
  };

  const handleStopScan = () => {
    ScannerModule.cancelCaptureImage();
    setScanStatus('Scanning Cancelled');
    setIsScanning(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Connection Indicator */}
      <View
        style={[
          styles.connectionBox,
          { backgroundColor: isReadyForScan ? 'green' : 'red' },
        ]}
      />
      <Text style={styles.statusText}>
        {isReadyForScan ? 'Device Connected' : 'Device Disconnected'}
      </Text>

      {/* Fingerprint Preview */}
      <FingerprintPreview />

      {/* Scan Status */}
      <Text style={styles.scanStatusText}>{scanStatus}</Text>

      {/* Start/Stop Scan Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Start Scanning"
          onPress={handleStartScan}
          disabled={!isReadyForScan || isScanning}
        />
        <Button
          title="Stop Scanning"
          onPress={handleStopScan}
          disabled={!isScanning}
        />
      </View>
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
    height: 300,
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
  previewImage: {
    width: '100%',
    height: '100%',
  },
  scanStatusText: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 20,
  },
});

export default App;
