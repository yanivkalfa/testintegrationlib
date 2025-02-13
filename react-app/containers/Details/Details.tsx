import React, {useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {styles} from './Details.styles';

import {
  AddSelector,
  CaseType,
  Gender,
  HarkashaDescription,
  RootStackParamList,
} from '../../config/types';

import {RootState, selectMachalProp} from '../../store/store';
import {updateCurrentMachal} from '../../store/machalSlice';
import {formatDate} from '../../utils/date.utils';
import {UpdateMachalProp} from './Details.types';
import {formatMachalId, formatWoundedId} from '../../utils/general.utils';

import EventDetails from './components/EventDetails/EventDetails';
import HarkashaDetails from './components/HarkashaDetails/HarkashaDetails';
import MarkishDetails from './components/MarkishDetails/MarkishDetails';
import Check from '../../assets/Check.svg';

import {useTheme} from '../../theme/hook/useTheme';
import SvgIcon from '../../components/SvgIcon/SvgIcon';

const genderMachalEnumValues = Object.values(Gender).map((option, index) => ({
  id: index,
  name: option,
}));

const ImageToEnumMap = ['FINGER', 'PALM', 'CORPSE', 'OTHER', 'FINGER_PART'];

const getSelector = (
  enumKey: keyof typeof HarkashaDescription,
  index: number,
): AddSelector => {
  return {
    id: index,
    name: HarkashaDescription[enumKey],
  };
};

const Details: React.FC = () => {
  const globalStyles = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const machalId = useSelector((state: RootState) =>
    selectMachalProp(state, 'id'),
  );

  const machalMimtza = useSelector((state: RootState) =>
    selectMachalProp(state, 'mimtza'),
  );
  const machalCaseType = useSelector((state: RootState) =>
    selectMachalProp(state, 'caseType'),
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

  const handleMimtzaSelect = (mimtzaSelector: AddSelector) => {
    updateMachalProp('mimtza', mimtzaSelector);
  };

  const handleGenderSelect = (id: number) => {
    const selectedGender = genderMachalEnumValues.find(item => item.id === id);
    if (selectedGender) {
      updateMachalProp('gender', selectedGender.name);
    }
  };

  return (
    <ScrollView style={globalStyles.containerScroll}>
      <View style={globalStyles.section}>
        <View style={globalStyles.sectionBody}>
          <View style={[globalStyles.rowEnd, globalStyles.alignCenter]}>
            <View style={globalStyles.sectionBodyTitle}>
              <Text style={globalStyles.sectionBodyTitleText}>
                {machalCaseType === CaseType.Wounded ? 'פצוע אלמוני' : 'זיהוי'}
              </Text>
              <Text style={globalStyles.sectionBodyText}>
                {machalCaseType === CaseType.Wounded
                  ? formatWoundedId(machalId || '')
                  : formatMachalId(machalId || '')}
              </Text>
            </View>
            <View style={globalStyles.verticalDividier}></View>
            {machalCaseType === CaseType.Wounded ? (
              <Check width={20} />
            ) : (
              <SvgIcon name="CORPSE" width={40} />
            )}
          </View>
        </View>
      </View>

      <View style={globalStyles.section}>
        <View
          style={
            machalCaseType === CaseType.Wounded
              ? globalStyles.sectionHeaderWounded
              : globalStyles.sectionHeaderMachal
          }>
          <Text
            style={
              machalCaseType === CaseType.Wounded
                ? globalStyles.sectionHeaderWoundedText
                : globalStyles.sectionHeaderMachalText
            }>
            {machalCaseType === CaseType.Wounded ? 'פרטי הפצוע' : 'פרטי החלל'}
          </Text>
        </View>
        <View style={globalStyles.sectionBody}>
          {machalCaseType === CaseType.Machal && (
            <>
              <Text style={styles.sectionTitle}>תיאור הרכשה *</Text>
              <View style={styles.iconContainer}>
                {ImageToEnumMap.map((key, index) => {
                  const selector = getSelector(
                    key as keyof typeof HarkashaDescription,
                    index,
                  );
                  return (
                    <TouchableOpacity
                      key={selector.id}
                      style={[
                        styles.iconButton,
                        machalMimtza?.id === selector.id &&
                          styles.selectedButton,
                      ]}
                      onPress={() => handleMimtzaSelect(selector)}>
                      <SvgIcon name={key} width={40} />
                      <Text
                        style={[
                          styles.iconText,
                          machalMimtza?.id === selector.id &&
                            styles.iconTextSelected,
                        ]}>
                        {selector.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}
        </View>
        <View style={globalStyles.sectionBody}>
          <Text style={styles.sectionTitle}>מין *</Text>
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
        <View style={globalStyles.sectionBody}>
          <EventDetails updateMachalProp={updateMachalProp} />
          <HarkashaDetails updateMachalProp={updateMachalProp} />
        </View>
      </View>
      <MarkishDetails updateMachalProp={updateMachalProp} />

      <View style={[globalStyles.rowSpace, globalStyles.sectionMargin]}>
        <TouchableOpacity
          style={[globalStyles.primaryButton]}
          onPress={goScanModeSelector}>
          <Text style={globalStyles.primaryButtonText}>לקיחת טב''א</Text>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.sectionSpacer} />
    </ScrollView>
  );
};

export default Details;
