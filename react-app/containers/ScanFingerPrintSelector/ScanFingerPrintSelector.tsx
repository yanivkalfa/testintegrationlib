import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './ScanFingerPrintSelector.styles';

import {Machal, RootStackParamList, SelectedFinger} from '../../config/types';
import {RootState, selectMachal} from '../../store/store';
import {
  FINGER_LABELS,
  FINGER_SCAN_ORDER,
  NO_FINGER_ENUM,
  NO_FINGER_LABELS,
} from '../../config/consts';
import {isFingersObjectEmpty} from '../../utils/general.utils';
import {addMachal} from '../../store/machalsSlice';
import {resetMachal} from '../../store/machalSlice';
import {useTheme} from '../../theme/hook/useTheme';
import Button from '../../components/Button/Button';
import FingerButton from './FingerButton/FingerButton';

const ScanFingerPrintSelector: React.FC = () => {
  const dispatch = useDispatch();
  const globalStyles = useTheme();
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
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.sectionHeaderText}>
            בחר אצבע להתחלת הרכשה
          </Text>
        </View>
      </View>
      <View
        style={[
          globalStyles.sectionTransparent,
          globalStyles.rowAround,
          globalStyles.sectionPadding,
        ]}>
        <Text style={globalStyles.sectionBodyTitleSecondaryText}>יד שמאל</Text>
        <Text style={globalStyles.sectionBodyTitleSecondaryText}>יד ימין</Text>
      </View>

      <ScrollView>
        {FINGER_SCAN_ORDER.map((row, rowIndex) => (
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
                <FingerButton
                  key={colIndex}
                  onPress={() => goScanFinger(fingerKey)}
                  fingerKey={fingerKey}
                  fingerData={fingerData}
                  hasImage={hasImage}
                  isNoFinger={isNoFinger}
                />
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={globalStyles.section}>
        <View style={[globalStyles.sectionBody, globalStyles.row]}>
          <Button
            onPress={finishAndSend}
            label="שליחה"
            style={{container: globalStyles.marginRight}}
            disabled={!canSend}
          />
          <Button
            onPress={() => navigation.goBack()}
            label="ביטול"
            primary={false}
            style={{container: globalStyles.marginRight}}
          />
        </View>
      </View>
    </View>
  );
};

export default ScanFingerPrintSelector;
