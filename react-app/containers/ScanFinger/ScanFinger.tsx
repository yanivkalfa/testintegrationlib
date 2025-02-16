import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
  StackActions,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

//import globalStyles from '../../global.styles';
import {styles} from './ScanFinger.styles';

import {
  Fingerprint,
  FingersObject,
  RootStackParamList,
  ScanMode,
} from '../../config/types';
import {FINGER_LABELS, NO_FINGER_ENUM} from '../../config/consts';
import {
  RootState,
  selectAppConfigsValue,
  selectMachalProp,
  store,
} from '../../store/store';
import {addOrUpdateFingerPrintForNewMachal} from '../../store/machalSlice';

import {deleteFile, saveFile} from '../../managers/FileManager';
import {
  beginCaptureImage,
  cancelCaptureImage,
} from '../../managers/ScannerManager';

import {testPrintBase64} from '../../assets/testPrintBase64';

import Scanner from '../Scanner/Scanner';
import NoFingerReasons from './components/NoFingerReasons/NoFingerReasons';
import {useTheme} from '../../theme/hook/useTheme';
import {getNextFinger} from '../../utils/general.utils';
import Button from '../../components/Button/Button';

const ScanFinger: React.FC = () => {
  const globalStyles = useTheme();
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

  const machalScanMode = useSelector((state: RootState) =>
    selectMachalProp(state, 'scanMode'),
  );
  const machalFingers = useSelector((state: RootState) =>
    selectMachalProp(state, 'fingers'),
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

      const currentFingerData = machalFingers?.[finger];
      if (
        !canScan &&
        selectedReason &&
        currentFingerData &&
        typeof currentFingerData === 'object' &&
        'storageFileName' in currentFingerData
      ) {
        await deleteFile(currentFingerData.storageFileName);
      }

      if (canScan /*&& scannedPrint*/) {
        const fileName = `${machalId}_${finger}.base64`;
        //await saveFile(fileName, testPrintBase64); //scannedPrint);
        await saveFile(fileName, scannedPrint); //scannedPrint);
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
      if (machalScanMode === ScanMode.ManualScan) {
        navigation.goBack();
      } else {
        const newMachalFingers =
          selectMachalProp(store.getState(), 'fingers') ?? {}; // to get fresh state after the change
        const finger = getNextFinger(newMachalFingers as FingersObject);
        if (finger && finger !== route.params?.finger) {
          navigation.dispatch(StackActions.replace('ScanFinger', {finger}));
        } else {
          navigation.navigate('ScanFingerPrintSelector');
        }
      }

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

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.section}>
        <View
          style={[
            globalStyles.sectionBody,
            globalStyles.rowEnd,
            globalStyles.alignCenter,
          ]}>
          <Text
            style={[
              globalStyles.sectionBodyText,
              globalStyles.sectionPadding,
              globalStyles.titleBase,
            ]}>
            {FINGER_LABELS[finger]}
          </Text>
          <Text
            style={[
              globalStyles.sectionBodyText,
              globalStyles.sectionBodyTitleText,
            ]}>
            הרכשה של:
          </Text>
        </View>
      </View>

      <Scanner value={scannedPrint} onScanCompleted={handleScanCompleted} />

      <View style={globalStyles.section}>
        <View style={[globalStyles.sectionBody, globalStyles.alignEnd]}>
          <Text style={globalStyles.sectionBodyTitleText}>
            יש להניח את האצבע במרכז החיישן
          </Text>
          <View style={[styles.progressBar]}>
            <View style={styles.progress}></View>
          </View>
        </View>
      </View>

      <View style={globalStyles.section}>
        <View style={[globalStyles.sectionBody, globalStyles.rowSpace]}>
          <Button
            onPress={handleCantScane}
            label="לא ניתן לסרוק"
            selected={!canScan}
            style={{container: globalStyles.marginRight}}
          />
          <Button
            onPress={handleCanScane}
            label="הרכשה מסורק"
            selected={!!(canScan && isDeviceConnected)}
            disabled={!isDeviceConnected}
            style={{container: globalStyles.marginLeft}}
          />
        </View>

        {!canScan && (
          <View style={globalStyles.sectionBody}>
            <NoFingerReasons
              onSelect={setSelectedReason}
              value={selectedReason}
              globalStyles={globalStyles}
            />
          </View>
        )}

        <View style={[globalStyles.sectionBody, globalStyles.rowSpace]}>
          <Button
            label="המשך"
            style={{container: scannedPrint ? globalStyles.marginRight : {}}}
            onPress={() => onContinue()}
            disabled={!canContinue}
          />
          {scannedPrint && (
            <Button
              label="סריקה חוזרת"
              primary={false}
              style={{container: globalStyles.marginLeft}}
              onPress={handleCanScane}
              disabled={!isDeviceConnected}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ScanFinger;
