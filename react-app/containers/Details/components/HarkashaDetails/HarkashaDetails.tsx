import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState, selectMachalProp} from '../../../../store/Store';
import {OriginLocation} from '../../../../config/types';
import {styles} from './HarkashaDetails.styles';
import {EventDetailsProps} from '../../Details.types';
import LocationInput from '../../../../components/LocationInput/LocationInput';
import {CityName} from '../../../../components/LocationInput/LocationInput.types';

const HarkashaDetails: React.FC<EventDetailsProps> = ({updateMachalProp}) => {
  const machalOriginLocation = useSelector((state: RootState) =>
    selectMachalProp(state, 'originLocation'),
  ) as OriginLocation | undefined;

  const machalHarkashaLocation = useSelector((state: RootState) =>
    selectMachalProp(state, 'harkashaLocation'),
  ) as string | undefined;

  const machalHarkashaTime = useSelector((state: RootState) =>
    selectMachalProp(state, 'harkashaTime'),
  ) as string | undefined;

  const onLocationChanged = (cityName: CityName) => {
    updateMachalProp('harkashaLocation', cityName || '');
  };

  return (
    <>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>נלקח ב</Text>
        <Picker
          selectedValue={machalOriginLocation}
          onValueChange={(itemValue: OriginLocation) => {
            updateMachalProp('originLocation', itemValue);
          }}
          style={styles.picker}>
          <Picker.Item label="בחר" value={undefined} />
          {Object.values(OriginLocation).map(location => (
            <Picker.Item key={location} label={location} value={location} />
          ))}
        </Picker>
      </View>

      <View style={styles.fieldContainer}>
        <LocationInput
          onChange={onLocationChanged}
          value={machalHarkashaLocation}
        />
      </View>

      <Text style={styles.fieldContainer}>
        תאריך הרשאה: {machalHarkashaTime}
      </Text>
    </>
  );
};

export default HarkashaDetails;
