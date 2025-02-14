import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useCameraPermission,
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {styles} from './Atzada.styles';

import {codeTypes} from './Atzada.types';
import {updateCurrentMachal} from '../../store/machalSlice';
import {RootStackParamList} from '../../config/types';
import {getRandomIDNumber} from '../../utils/math.utils';
import {RootState, selectMachalProp} from '../../store/store';
import {useTheme} from '../../theme/hook/useTheme';
import Button from '../../components/Button/Button';

const Atzada: React.FC = () => {
  const globalStyles = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const machalCaseType = useSelector((state: RootState) =>
    selectMachalProp(state, 'caseType'),
  );
  const machalId = useSelector((state: RootState) =>
    selectMachalProp(state, 'id'),
  );

  const [finishedScanning, setFinishedScanning] = useState<boolean>(false);
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
        setFinishedScanning(true);
        codeFrequencies.current = {};
      }
    },
  });

  const onContinue = (code?: string | null) => {
    const id = code ?? scannedCode ?? undefined;
    if (id) {
      dispatch(updateCurrentMachal({id}));
      navigation.navigate('Details');
    }
  };

  const onNoId = () => {
    const generatedId = getRandomIDNumber();
    setScannedCode(generatedId);
    onContinue(generatedId);
  };

  const onMachalIdChange = (machalId: string | null) => {
    setScannedCode(machalId);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHeader}>
          <Text
            style={[globalStyles.sectionHeaderText, styles.sectionTitleText]}>
            סריקת מח"ל
          </Text>
        </View>
        <View style={globalStyles.sectionBody}>
          <Text style={globalStyles.sectionBodyText}>
            יש לסרוק את הברקוד שעל אצודת המח"ל
          </Text>
        </View>
      </View>

      <Camera
        style={globalStyles.sectionMain}
        device={device}
        isActive={!finishedScanning}
        codeScanner={codeScanner}
      />

      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.sectionHeaderText}>מספר מח''ל</Text>
        </View>
        <View style={globalStyles.sectionBody}>
          <TextInput
            placeholder="הזן מספר מח''ל"
            style={styles.input}
            value={scannedCode || ''}
            onChangeText={text => onMachalIdChange(text)}
          />
          <View style={globalStyles.rowSpace}>
            <Button
              onPress={() => onContinue()}
              label="המשך"
              disabled={!scannedCode}
              style={{container: globalStyles.marginRight}}
            />
            <Button
              onPress={onNoId}
              label="אין לי אצודה"
              style={{container: globalStyles.marginLeft}}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Atzada;
