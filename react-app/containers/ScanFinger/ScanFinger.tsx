import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RNFS from 'react-native-fs';
import {styles} from './ScanFinger.styles';
import globalStyles from '../../global.styles';
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {
  FingerFile,
  RootStackParamList,
  SelectedFinger,
} from '../../config/types';
import {FINGER_LABELS} from '../../config/consts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, selectMachalProp} from '../../store/Store';
import {
  addOrUpdateFingerPrintForNewMachal,
  updateCurrentMachal,
} from '../../store/machalSlice';
import {saveFile} from '../../managers/FileManager';

import {testPrintBase64} from '../../assets/testPrintBase64'; // just a mock

const ScanFinger = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ScanFinger'>>();
  const {finger} = route.params;
  const machalId = useSelector((state: RootState) =>
    selectMachalProp(state, 'id'),
  );

  const handleFingerSelect = (selectedFinger: SelectedFinger) => {
    dispatch(updateCurrentMachal({selectedFinger}));
  };

  const onContinue = async () => {
    if (!machalId) {
      console.error('Machal ID is missing!');
      return;
    }

    try {
      const fileName = `${machalId}_${finger}.base64`;
      await saveFile(fileName, testPrintBase64);
      const fingerPrint: FingerFile = {
        storageFileName: fileName,
        height: 200,
        width: 200,
      };
      console.log('fingerPrint', fingerPrint);
      dispatch(
        addOrUpdateFingerPrintForNewMachal({fingerIndex: finger, fingerPrint}),
      );
      handleFingerSelect(null);
      navigation.goBack();
      console.log(`Fingerprint saved and added for ${finger}:`, fingerPrint);
    } catch (error) {
      console.error('Error saving fingerprint:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>
          הרכשה: {FINGER_LABELS[finger]}
        </Text>
      </View>

      <View style={[globalStyles.section, globalStyles.sectionMain]}>
        <Text style={styles.fingerprintText}>Fingerprint</Text>
      </View>

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
          <TouchableOpacity style={globalStyles.abortButton} onPress={() => {}}>
            <Text style={globalStyles.abortButtonText}>לא ניתן לסרוק</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.abortButton} onPress={() => {}}>
            <Text style={globalStyles.abortButtonText}>הרכשה מסורקת</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.continueButtonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => onContinue()}>
            <Text style={globalStyles.actionButtonText}>המשך</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScanFinger;
