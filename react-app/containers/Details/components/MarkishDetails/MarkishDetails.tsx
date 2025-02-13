import React, {useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useSelector} from 'react-redux';

import {RootState, selectMachalProp} from '../../../../store/store';
import {EventDetailsProps} from '../../Details.types';

import {getAccounts} from '../../../../managers/AuthManager';
import {useTheme} from '../../../../theme/hook/useTheme';
import {CaseType} from '../../../../config/types';

const getUserTeudatZehut = (myIdfMailAdress: string) => {
  const index = myIdfMailAdress.indexOf('@');
  if (index > 0) {
    return myIdfMailAdress.substring(0, index);
  }
};

const MarkishDetails: React.FC<EventDetailsProps> = ({updateMachalProp}) => {
  const globalStyles = useTheme();
  const machalMarkishIdNumber = useSelector((state: RootState) =>
    selectMachalProp(state, 'markishIdNumber'),
  ) as string | undefined;

  const machalMarkishName = useSelector((state: RootState) =>
    selectMachalProp(state, 'markishName'),
  ) as string | undefined;

  const machalCaseType = useSelector((state: RootState) =>
    selectMachalProp(state, 'caseType'),
  );

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await getAccounts();
      if (accounts.length > 0) {
        const teudatZehut = getUserTeudatZehut(accounts[0].username);
        if (teudatZehut) {
          updateMachalProp('markishIdNumber', teudatZehut);
          updateMachalProp(
            'markishName',
            (accounts[0]?.claims as {name?: string})?.name || '',
          );
        }
      }
    };

    fetchAccounts();
  }, []);

  return (
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
          פרטי המרכיש
        </Text>
      </View>
      <View style={globalStyles.sectionBody}>
        <TextInput
          style={[globalStyles.inputGray, globalStyles.sectionMargin]}
          value={machalMarkishIdNumber}
          onChangeText={text => updateMachalProp('markishIdNumber', text)}
          multiline
          placeholder="ת.ז/מ.א *"
        />
        <TextInput
          style={[globalStyles.inputGray, globalStyles.sectionMargin]}
          value={machalMarkishName}
          onChangeText={text => updateMachalProp('markishName', text)}
          multiline
          placeholder="שם מלא *"
        />
      </View>
    </View>
  );
};

export default MarkishDetails;
