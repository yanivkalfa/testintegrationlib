import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './ScanFinger.styles';

const ScanFinger = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>⬅️</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>הרכשת טביעות אצבע</Text>
        <Text style={styles.headerSubtitle}>738253793 מספר הרשאת רכישה</Text>
      </View>

      {/* Finger Selection */}
      <Text style={styles.fingerTitle}>אגודל ימין</Text>

      {/* Fingerprint Area */}
      <View style={styles.fingerprintContainer}>
        <View style={styles.fingerprintImage}>
          {/* Placeholder for the fingerprint image */}
          <Text style={styles.fingerprintText}>Fingerprint</Text>
        </View>
        <Text style={styles.fingerprintInstruction}>
          יש להניח את האצבע במרכז החיישן
        </Text>
        {/* Progress Indicator */}
        <View style={styles.progressBar}>
          <View style={styles.progress}></View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>לא ניתן לסרוק</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>הרכשה מסורקת</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>המשך</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScanFinger;
