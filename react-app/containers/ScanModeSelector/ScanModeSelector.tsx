import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {
  CaseType,
  FingersObject,
  RootStackParamList,
  ScanMode,
} from '../../config/types';
import {
  RootState,
  selectAppConfigsValue,
  selectMachalProp,
} from '../../store/store';
import {updateCurrentMachal} from '../../store/machalSlice';
import {useTheme} from '../../theme/hook/useTheme';
import {
  formatMachalId,
  formatWoundedId,
  getNextFinger,
} from '../../utils/general.utils';
import Button from '../../components/Button/Button';

const ScanModeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const globalStyles = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const machalId = useSelector((state: RootState) =>
    selectMachalProp(state, 'id'),
  );

  const connectedDeviceName = useSelector((state: RootState) =>
    selectAppConfigsValue(state, 'connectedDeviceName'),
  );

  const isDeviceConnected = useSelector((state: RootState) =>
    selectAppConfigsValue(state, 'isDeviceConnected'),
  );

  const machalCaseType = useSelector((state: RootState) =>
    selectMachalProp(state, 'caseType'),
  );

  const machalFingers = useSelector((state: RootState) =>
    selectMachalProp(state, 'fingers'),
  );

  const updateScanMode = (value: ScanMode) => {
    dispatch(updateCurrentMachal({scanMode: value}));
    if (value === ScanMode.ManualScan) {
      navigation.navigate('ScanFingerPrintSelector');
    } else {
      const finger = getNextFinger(machalFingers as FingersObject);
      if (finger) {
        navigation.navigate('ScanFinger', {finger});
      }
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.sectionHeaderText}>הרכשת טביעות אצבע</Text>
        </View>
        <View style={globalStyles.sectionBody}>
          <Text style={globalStyles.sectionBodyText}>
            מספר הרכשה:{' '}
            {machalCaseType === CaseType.Wounded
              ? formatWoundedId(machalId || '')
              : formatMachalId(machalId || '')}
          </Text>
        </View>
      </View>

      <View style={[globalStyles.section, globalStyles.sectionMain]}>
        <Text style={globalStyles.sectionBodyText}>תמונה של אצבע</Text>
      </View>

      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.sectionHeaderText}>פרטי סורק</Text>
        </View>
        <View style={[globalStyles.sectionBody, globalStyles.alignEnd]}>
          <Text style={globalStyles.sectionBodyText}>
            {connectedDeviceName}
          </Text>
          <Text style={globalStyles.sectionBodyText}>V: 3.11.40a</Text>
        </View>
      </View>

      <View style={globalStyles.section}>
        <View style={[globalStyles.sectionBody, globalStyles.row]}>
          <Button
            onPress={() => updateScanMode(ScanMode.AutoScan)}
            label="הרכשה אוטומטית"
            style={{container: globalStyles.marginRight}}
          />
          <Button
            onPress={() => updateScanMode(ScanMode.ManualScan)}
            label="הרכשה ידנית"
            style={{container: globalStyles.marginRight}}
          />
        </View>
      </View>
    </View>
  );
};

export default ScanModeSelector;
