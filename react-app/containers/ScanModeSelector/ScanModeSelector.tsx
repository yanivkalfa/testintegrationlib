import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import globalStyles from '../../global.styles';
import {styles as ScanModeSelectorStyles} from './ScanModeSelector.styles';

import {RootStackParamList, ScanMode} from '../../config/types';
import {
  RootState,
  selectAppConfigsValue,
  selectMachalProp,
} from '../../store/store';
import {updateCurrentMachal} from '../../store/machalSlice';

const ScanModeSelector: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const machalId = useSelector((state: RootState) =>
    selectMachalProp(state, 'id'),
  );

  const connectedDeviceName = useSelector((state: RootState) =>
    selectAppConfigsValue(state, 'connectedDeviceName'),
  );

  const updateScanMode = (value: ScanMode) => {
    dispatch(updateCurrentMachal({scanMode: value}));
    navigation.navigate('ScanFingerPrintSelector');
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>הרכשת טביעות אצבע</Text>
        <Text style={globalStyles.sectionSubTitle}>
          {machalId} מספר הרשאת רכישה
        </Text>
      </View>

      <View style={[globalStyles.section, globalStyles.sectionMain]}>
        <Text style={globalStyles.sectionSubTitle}>תמונה של אצבע</Text>
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>פרטי סורק</Text>
        <Text style={globalStyles.sectionSubTitle}>{connectedDeviceName}</Text>
        <Text style={ScanModeSelectorStyles.footerText}>V: 3.11.40a</Text>
      </View>

      <View style={[globalStyles.section, globalStyles.sectionHorizontal]}>
        <TouchableOpacity
          style={globalStyles.actionButton}
          onPress={() => updateScanMode(ScanMode.AutoScan)}>
          <Text style={globalStyles.actionButtonText}>הרכשה אוטומטית</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.actionButton}
          onPress={() => updateScanMode(ScanMode.ManualScan)}>
          <Text style={globalStyles.actionButtonText}>הרכשה ידנית</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanModeSelector;
