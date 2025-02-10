import React, {useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState, selectMachalProp} from '../../../../store/store';
import {styles} from './MarkishDetails.styles';
import {EventDetailsProps} from '../../Details.types';
import {getAccounts} from '../../../../managers/AuthManager';

const getUserTeudatZehut = (myIdfMailAdress: string) => {
  const index = myIdfMailAdress.indexOf('@');
  if (index > 0) {
    return myIdfMailAdress.substring(0, index);
  }
};

const MarkishDetails: React.FC<EventDetailsProps> = ({updateMachalProp}) => {
  const machalMarkishIdNumber = useSelector((state: RootState) =>
    selectMachalProp(state, 'markishIdNumber'),
  ) as string | undefined;

  const machalMarkishName = useSelector((state: RootState) =>
    selectMachalProp(state, 'markishName'),
  ) as string | undefined;

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
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>פרטי המרכיש</Text>
      <TextInput
        style={styles.input}
        value={machalMarkishIdNumber}
        onChangeText={text => updateMachalProp('markishIdNumber', text)}
        multiline
        placeholder="ת.ז/מ.א *"
      />
      <TextInput
        style={styles.input}
        value={machalMarkishName}
        onChangeText={text => updateMachalProp('markishName', text)}
        multiline
        placeholder="שם מלא *"
      />
    </View>
  );
};

export default MarkishDetails;
