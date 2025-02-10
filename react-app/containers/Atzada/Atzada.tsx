import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './Atzada.styles';
import {
  useCameraPermission,
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {codeTypes} from './Atzada.types';
import {updateCurrentMachal} from '../../store/machalSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../config/types';
import {getRandomIDNumber} from '../../utils/math.utils';
import {RootState, selectMachalProp} from '../../store/store';

const Atzada = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const machalCaseType = useSelector((state: RootState) =>
    selectMachalProp(state, 'caseType'),
  );
  const machalId = useSelector((state: RootState) =>
    selectMachalProp(state, 'id'),
  );

  const [fnishedScanning, setFnishedScanning] = useState<boolean>(false);
  const [scannedCode, setScannedCode] = useState<string | null>(machalId);
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const codesScanned = useRef<number>(0);
  const codeFrequencies = useRef<{[value: string]: number}>({});

  useEffect(() => {
    if (!machalCaseType) {
      navigation.navigate('Home');
    }
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  if (device == null) return null;

  const findMostFrequentCode = (frequencies: {[value: string]: number}) => {
    let maxFrequency = 0;
    let mostFrequentValue = null;

    Object.entries(frequencies).forEach(([value, frequency]) => {
      if (frequency > maxFrequency) {
        maxFrequency = frequency;
        mostFrequentValue = value;
      }
    });

    return mostFrequentValue;
  };

  const codeScanner = useCodeScanner({
    codeTypes: codeTypes,
    onCodeScanned: codes => {
      codes.forEach(code => {
        if (code.value) {
          codesScanned.current += 1;
          if (!codeFrequencies.current[code.value]) {
            codeFrequencies.current[code.value] = 0;
          }
          codeFrequencies.current[code.value] += 1;
        }
      });

      if (codesScanned.current >= 50) {
        codesScanned.current = 0;
        const mostFrequentCode = findMostFrequentCode(codeFrequencies.current);
        setScannedCode(mostFrequentCode);
        setFnishedScanning(true);
        codeFrequencies.current = {};
      }
    },
  });

  const onContinue = () => {
    if (scannedCode) {
      dispatch(updateCurrentMachal({id: scannedCode}));
      navigation.navigate('Details');
    }
  };

  const onNoId = () => {
    setScannedCode(getRandomIDNumber());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.instructionsTitle}>סריקת מח"ל</Text>
        <Text style={styles.instructionsText}>
          יש לסרוק את הברקוד שעל אצודת המח"ל
        </Text>
      </View>

      <Camera
        style={styles.qrScanner}
        device={device}
        isActive={!fnishedScanning}
        codeScanner={codeScanner}
      />

      <View style={styles.footer}>
        <TextInput
          placeholder="הזן מספר מח''ל"
          style={styles.input}
          value={scannedCode || ''}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.secondaryButton} onPress={onNoId}>
            <Text style={styles.secondaryButtonText}>אין לי אצודה</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryButton}
            disabled={!scannedCode}
            onPress={onContinue}>
            <Text style={styles.primaryButtonText}>המשך</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Atzada;
