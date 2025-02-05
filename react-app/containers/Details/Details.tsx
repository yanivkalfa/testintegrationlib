import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {styles} from './Details.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../config/types';

const Details = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const goScanModeSelector = () => {
    navigation.navigate('ScanModeSelector');
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>זיהוי</Text>
        <Text style={styles.headerSubtitle}>738-253-793</Text>
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>פרטי החלל</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Text>אצבע</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>כף יד</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>גופה שלמה</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Text>חלק מאצבע</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>לא ידוע</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>מין *</Text>
        <View style={styles.genderRow}>
          <TouchableOpacity style={styles.genderButton}>
            <Text>זכר</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genderButton}>
            <Text>נקבה</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.genderButton}>
            <Text>לא ידוע</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional Information Section */}
      <View style={styles.section}>
        <TextInput style={styles.input} placeholder="שייך אירוע משני *" />
        <TextInput style={styles.input} placeholder="נלקח ב *" />
        <TextInput style={styles.input} placeholder="מיקום הרשאה *" />
        <Text style={styles.timestamp}>תאריך הרשאה: 18:16 30/01/2025</Text>
      </View>

      {/* Registering Entity Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>פרטי המרכיש</Text>
        <TextInput style={styles.input} placeholder="ת.ז/מ.א *" />
        <TextInput style={styles.input} placeholder="שם מלא *" />
      </View>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <Button title="לקיחת טב''א" onPress={() => goScanModeSelector()} />
      </View>
    </ScrollView>
  );
};

export default Details;
