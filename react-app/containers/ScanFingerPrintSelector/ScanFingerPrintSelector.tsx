import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import globalStyles from '../../global.styles';
import {styles} from './ScanFingerPrintSelector.styles';

import {Machal, RootStackParamList, SelectedFinger} from '../../config/types';
import {RootState, selectMachal, selectMachalProp} from '../../store/store';
import {
  FINGER_LABELS,
  FINGERS,
  NO_FINGER_ENUM,
  NO_FINGER_LABELS,
} from '../../config/consts';
import {isFingersObjectEmpty} from '../../utils/general.utils';
import {addMachal} from '../../store/machalsSlice';
import {resetMachal} from '../../store/machalSlice';

const ScanFingerPrintSelector: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const machalDetails = useSelector((state: RootState) => selectMachal(state));

  const goScanFinger = (selectedFinger: SelectedFinger) => {
    if (selectedFinger) {
      navigation.navigate('ScanFinger', {finger: selectedFinger});
    }
  };

  const canSend = !isFingersObjectEmpty(machalDetails.fingers);
  const finishAndSend = () => {
    if (!canSend) {
      return false;
    }
    dispatch(addMachal(machalDetails as Machal));
    dispatch(resetMachal());
    navigation.navigate('Home');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>בחר אצבע להתחלת הרכשה</Text>
      </View>

      <ScrollView contentContainerStyle={styles.selectionContainer}>
        {[
          [FINGERS.THUMB_LEFT, FINGERS.THUMB_RIGHT],
          [FINGERS.INDEX_FINGER_LEFT, FINGERS.INDEX_FINGER_RIGHT],
          [FINGERS.MIDDLE_FINGER_LEFT, FINGERS.MIDDLE_FINGER_RIGHT],
          [FINGERS.RING_FINGER_LEFT, FINGERS.RING_FINGER_RIGHT],
          [FINGERS.LITTLE_FINGER_LEFT, FINGERS.LITTLE_FINGER_RIGHT],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((fingerKey, colIndex) => {
              const fingerData = machalDetails.fingers?.[fingerKey];
              const hasImage =
                typeof fingerData === 'object' &&
                'storageFileName' in fingerData;
              const isNoFinger =
                typeof fingerData === 'string' &&
                Object.values(NO_FINGER_ENUM).includes(fingerData);

              return (
                <TouchableOpacity
                  key={colIndex}
                  onPress={() => goScanFinger(fingerKey)}
                  style={[
                    styles.fingerButton,
                    hasImage && styles.fingerButtonChecked,
                    isNoFinger && styles.fingerButtonError,
                  ]}>
                  <Text style={styles.fingerText}>
                    {FINGER_LABELS[fingerKey]}
                  </Text>
                  <Text style={styles.statusText}>
                    {hasImage
                      ? 'נסרק'
                      : isNoFinger
                      ? NO_FINGER_LABELS[
                          fingerData as keyof typeof NO_FINGER_ENUM
                        ]
                      : 'טרם נסרק'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
      <View style={[globalStyles.section, globalStyles.sectionHorizontal]}>
        <TouchableOpacity
          style={[globalStyles.actionButton, !canSend && globalStyles.disabled]}
          onPress={finishAndSend}
          disabled={!canSend}>
          <Text
            style={[
              globalStyles.actionButtonText,
              !canSend && globalStyles.disabled,
            ]}>
            שליחה
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.abortButton}
          onPress={() => navigation.goBack()}>
          <Text style={globalStyles.abortButtonText}>ביטול</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanFingerPrintSelector;
