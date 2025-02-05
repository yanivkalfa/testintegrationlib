import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './Details.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  Gender,
  HarkashaDescription,
  Machal,
  RootStackParamList,
  Selector,
} from '../../config/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, selectMachalProp} from '../../store/Store';
import {updateCurrentMachal} from '../../store/machalSlice';

const mimtzaMachalEnumValues = Object.values(HarkashaDescription).map(
  (option, index) => ({
    id: index,
    name: option,
  }),
) as Selector[];

const genderMachalEnumValues = Object.values(Gender).map((option, index) => ({
  id: index,
  name: option,
}));

const Details = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const machalId = useSelector((state: RootState) =>
    selectMachalProp(state, 'id'),
  );

  const machalMimtza = useSelector((state: RootState) =>
    selectMachalProp(state, 'mimtza'),
  );

  const machalGender = useSelector((state: RootState) =>
    selectMachalProp(state, 'gender'),
  );

  useEffect(() => {
    if (!machalId) {
      navigation.navigate('Atzada');
    }
  }, []);

  const goScanModeSelector = () => {
    navigation.navigate('ScanModeSelector');
  };

  const updateMachalProp = <K extends keyof Machal>(
    key: K,
    value: Machal[K],
  ) => {
    dispatch(
      updateCurrentMachal({
        [key]: value,
      }),
    );
  };

  const handleMimtzaSelect = (id: number) => {
    const selectedMimtza = mimtzaMachalEnumValues.find(item => item.id === id);
    if (selectedMimtza) {
      updateMachalProp('mimtza', selectedMimtza); // Update the Redux store
    }
  };

  const handleGenderSelect = (id: number) => {
    const selectedGender = genderMachalEnumValues.find(item => item.id === id);
    if (selectedGender) {
      updateMachalProp('gender', selectedGender.name); // Update the Redux store
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>זיהוי</Text>
        <Text style={styles.headerSubtitle}>{machalId}</Text>
      </View>

      {/* Description Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>פרטי החלל</Text>
        <View style={styles.iconContainer}>
          {mimtzaMachalEnumValues.map(label => (
            <TouchableOpacity
              key={label.id}
              style={[
                styles.iconButton,
                machalMimtza?.id === label.id && styles.selectedButton,
              ]}
              onPress={() => handleMimtzaSelect(label.id)} // Handle button press
            >
              <Text
                style={[
                  styles.iconText,
                  machalMimtza?.id === label.id && styles.iconTextSelected,
                ]}>
                {label.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>מין *</Text>
        <View style={styles.genderRow}>
          {genderMachalEnumValues.map(label => (
            <TouchableOpacity
              key={label.id}
              style={[
                styles.iconButton,
                machalGender === label.name && styles.selectedButton,
              ]}
              onPress={() => handleGenderSelect(label.id)}>
              <Text
                style={[
                  styles.iconText,
                  machalMimtza?.id === label.id && styles.iconTextSelected,
                ]}>
                {label.name}
              </Text>
            </TouchableOpacity>
          ))}
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
