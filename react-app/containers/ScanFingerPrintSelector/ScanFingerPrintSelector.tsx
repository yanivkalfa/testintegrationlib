import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './ScanFingerPrintSelector.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../config/types';

const ScanFingerPrintSelector = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const goScanFinger = () => {
    navigation.navigate('ScanFinger');
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>הרכשת טביעות אצבע</Text>
        <Text style={styles.headerSubtitle}>738253793 מספר הרשאת רכישה</Text>
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>בחר אצבע להתחלת הרכשה</Text>

      {/* Finger Selection Area */}
      <ScrollView contentContainerStyle={styles.selectionContainer}>
        {[
          ['אגודל שמאל', 'אגודל ימין'],
          ['אצבע שמאל', 'אצבע ימין'],
          ['אמה שמאל', 'אמה ימין'],
          ['קמיצה שמאל', 'קמיצה ימין'],
          ['זרת שמאל', 'זרת ימין'],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((finger, colIndex) => (
              <TouchableOpacity key={colIndex} style={styles.fingerButton}>
                <Text style={styles.fingerText}>{finger}</Text>
                <Text style={styles.statusText}>טרם נסרק</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.abortButton}
          onPress={() => goScanFinger()}>
          <Text style={styles.abortButtonText}>ביטול</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => goScanFinger()}>
          <Text style={styles.continueButtonText}>המשך</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanFingerPrintSelector;
