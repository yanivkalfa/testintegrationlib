import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {styles} from './ScanModeSelector.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../config/types';

const ScanModeSelector = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const goScanFingerPrintSelector = () => {
    navigation.navigate('ScanFingerPrintSelector');
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>חזור</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>הרכשת טביעות אצבע</Text>
        <Text style={styles.headerSubtitle}>738253793 מספר הרשאת רכישה</Text>
      </View>

      {/* Fingerprint Area */}
      <View style={styles.fingerprintContainer}>
        {/* Placeholder for the fingerprint image */}
        <View style={styles.fingerprintImage}>
          {/* Replace with an actual image or SVG */}
          <Text style={styles.fingerprintText}>Fingerprint Image</Text>
        </View>
        <Text style={styles.deviceInfo}>
          WATSON_v2.0.1 (WM1129C-31900089-000K)
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => goScanFingerPrintSelector()}>
          <Text style={styles.actionButtonText}>הרכשה ידנית</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => goScanFingerPrintSelector()}>
          <Text style={styles.actionButtonText}>הרכשה אוטומטית</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>V: 3.11.40a</Text>
    </View>
  );
};

export default ScanModeSelector;
