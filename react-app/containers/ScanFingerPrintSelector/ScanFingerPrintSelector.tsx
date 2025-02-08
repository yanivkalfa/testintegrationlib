import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './ScanFingerPrintSelector.styles';
import globalStyles from '../../global.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../config/types';
import {useSelector} from 'react-redux';
import {RootState, selectMachalProp} from '../../store/Store';
import {FINGER_LABELS, FINGERS} from '../../config/consts';

const ScanFingerPrintSelector = () => {
  const [selectedFinger, setSelectedFinger] = useState<
    keyof typeof FINGERS | null
  >(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const machalFingers = useSelector((state: RootState) =>
    selectMachalProp(state, 'fingers'),
  );

  const goScanFinger = () => {
    if (selectedFinger) {
      navigation.navigate('ScanFinger', {finger: selectedFinger});
    }
  };

  const handleFingerSelect = (finger: keyof typeof FINGERS) => {
    setSelectedFinger(finger);
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
              const hasImage =
                typeof machalFingers?.[fingerKey] === 'object' &&
                'storageFileName' in machalFingers[fingerKey];
              return (
                <TouchableOpacity
                  key={colIndex}
                  onPress={() => handleFingerSelect(fingerKey)}
                  style={[
                    styles.fingerButton,
                    hasImage && styles.fingerButtonChecked,
                    selectedFinger === fingerKey && styles.fingerButtonSelected,
                  ]}>
                  <Text style={styles.fingerText}>
                    {FINGER_LABELS[fingerKey]}
                  </Text>
                  <Text style={styles.statusText}>
                    {hasImage ? 'נסרק' : 'טרם נסרק'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
      <View style={[globalStyles.section, globalStyles.sectionHorizontal]}>
        <TouchableOpacity
          style={globalStyles.abortButton}
          onPress={() => navigation.goBack()}>
          <Text style={globalStyles.abortButtonText}>ביטול</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.actionButton}
          onPress={() => goScanFinger()}
          disabled={!selectedFinger}>
          <Text style={globalStyles.actionButtonText}>המשך</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanFingerPrintSelector;
