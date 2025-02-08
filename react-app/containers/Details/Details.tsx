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
  RootStackParamList,
  Selector,
} from '../../config/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, selectMachalProp} from '../../store/Store';
import {updateCurrentMachal} from '../../store/machalSlice';
import EventDetails from './components/EventDetails/EventDetails';
import {formatDate} from '../../utils/date.utils';
import {UpdateMachalProp} from './Details.types';
import HarkashaDetails from './components/HarkashaDetails/HarkashaDetails';
import MarkishDetails from './components/MarkishDetails/MarkishDetails';

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

  const updateMachalProp: UpdateMachalProp = (key, value) => {
    dispatch(
      updateCurrentMachal({
        [key]: value,
      }),
    );
  };

  useEffect(() => {
    if (!machalId) {
      navigation.navigate('Atzada');
    }
    updateMachalProp('harkashaTime', formatDate());
  }, []);

  const goScanModeSelector = () => {
    navigation.navigate('ScanModeSelector');
  };

  const handleMimtzaSelect = (id: number) => {
    const selectedMimtza = mimtzaMachalEnumValues.find(item => item.id === id);
    if (selectedMimtza) {
      updateMachalProp('mimtza', selectedMimtza);
    }
  };

  const handleGenderSelect = (id: number) => {
    const selectedGender = genderMachalEnumValues.find(item => item.id === id);
    if (selectedGender) {
      updateMachalProp('gender', selectedGender.name);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>זיהוי</Text>
        <Text style={styles.headerSubtitle}>{machalId}</Text>
      </View>

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
              onPress={() => handleMimtzaSelect(label.id)}>
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

      <View style={styles.section}>
        <EventDetails updateMachalProp={updateMachalProp} />
        <HarkashaDetails updateMachalProp={updateMachalProp} />
      </View>
      <MarkishDetails updateMachalProp={updateMachalProp} />
      <View style={styles.buttonContainer}>
        <Button title="לקיחת טב''א" onPress={() => goScanModeSelector()} />
      </View>
    </ScrollView>
  );
};

export default Details;
