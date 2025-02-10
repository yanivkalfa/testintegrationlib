import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './ScanFinger.styles';
import globalStyles from '../../global.styles';
import {Fingerprint, RootStackParamList} from '../../config/types';
import {FINGER_LABELS, NO_FINGER_ENUM} from '../../config/consts';
import {
  RootState,
  selectAppConfigsValue,
  selectMachalProp,
} from '../../store/store';
import {addOrUpdateFingerPrintForNewMachal} from '../../store/machalSlice';
import {saveFile} from '../../managers/FileManager';

import Scanner from '../Scanner/Scanner';
import {
  beginCaptureImage,
  cancelCaptureImage,
} from '../../managers/ScannerManager';
import NoFingerReasons from './components/NoFingerReasons/NoFingerReasons';

const ScanFinger = () => {
  const [canScan, setCanScan] = useState<boolean>(true);
  const [scannedPrint, setScannedPrint] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<
    keyof typeof NO_FINGER_ENUM
  >(NO_FINGER_ENUM.OTHER);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ScanFinger'>>();
  const {finger} = route.params;
  const machalId = useSelector((state: RootState) =>
    selectMachalProp(state, 'id'),
  );

  const isDeviceConnected = useSelector((state: RootState) =>
    selectAppConfigsValue(state, 'isDeviceConnected'),
  );

  const canContinue = canScan ? !!scannedPrint : !!selectedReason;

  const onContinue = async () => {
    if (!canContinue) {
      return false;
    }
    if (!machalId) {
      console.error('Machal ID is missing!');
      return;
    }

    try {
      let fingerPrint: Fingerprint = selectedReason;
      if (canScan) {
        const fileName = `${machalId}_${finger}.base64`;
        await saveFile(fileName, scannedPrint);
        fingerPrint = {
          storageFileName: fileName,
          height: 200,
          width: 200,
        };
      }
      console.log('fingerPrint', fingerPrint);
      dispatch(
        addOrUpdateFingerPrintForNewMachal({fingerIndex: finger, fingerPrint}),
      );
      navigation.goBack();
      console.log(`Fingerprint saved and added for ${finger}:`, fingerPrint);
    } catch (error) {
      console.error('Error saving fingerprint:', error);
    }
  };

  const handleCanScane = () => {
    if (isDeviceConnected) {
      setCanScan(true);
      setSelectedReason(NO_FINGER_ENUM.OTHER);
      beginCaptureImage();
    }
  };

  const handleCantScane = () => {
    setCanScan(false);
    if (isDeviceConnected) {
      cancelCaptureImage();
    }
  };

  const handleScanCompleted = (printBase64: string) => {
    setScannedPrint(printBase64);
  };

  console.log('isDeviceConnected', isDeviceConnected);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>
          הרכשה: {FINGER_LABELS[finger]}
        </Text>
      </View>

      <Scanner value={scannedPrint} onScanCompleted={handleScanCompleted} />

      <View style={styles.fingerprintContainer}>
        <Text style={styles.fingerprintInstruction}>
          יש להניח את האצבע במרכז החיישן
        </Text>
        <View style={styles.progressBar}>
          <View style={styles.progress}></View>
        </View>
      </View>

      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHorizontal}>
          <TouchableOpacity
            style={[
              globalStyles.abortButton,
              !canScan && globalStyles.actionButtonSelected,
            ]}
            onPress={handleCantScane}>
            <Text style={globalStyles.abortButtonText}>לא ניתן לסרוק</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.abortButton,
              canScan && isDeviceConnected && globalStyles.actionButtonSelected,
              !isDeviceConnected && globalStyles.disabled,
            ]}
            onPress={handleCanScane}>
            <Text
              style={[
                globalStyles.abortButtonText,
                !isDeviceConnected && globalStyles.disabled,
              ]}>
              הרכשה מסורק
            </Text>
          </TouchableOpacity>
        </View>
        {!canScan && (
          <NoFingerReasons
            onSelect={setSelectedReason}
            value={selectedReason}
          />
        )}
        <View style={styles.continueButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !canContinue && globalStyles.disabled,
            ]}
            disabled={!canContinue}
            onPress={() => onContinue()}>
            <Text
              style={[
                globalStyles.actionButtonText,
                !canContinue && globalStyles.disabled,
              ]}>
              המשך
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScanFinger;
