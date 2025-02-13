import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import {styles} from './HarkashaDetails.styles';

import {RootState, selectMachalProp} from '../../../../store/store';
import {OriginLocation} from '../../../../config/types';
import {EventDetailsProps} from '../../Details.types';

import LocationInput from '../../../../components/LocationInput/LocationInput';
import {CityName} from '../../../../components/LocationInput/LocationInput.types';
import globalStyles from '../../../../global.styles';
import {useTheme} from '../../../../theme/hook/useTheme';

const HarkashaDetails: React.FC<EventDetailsProps> = ({updateMachalProp}) => {
  const globalStyles = useTheme();
  const machalOriginLocation = useSelector((state: RootState) =>
    selectMachalProp(state, 'originLocation'),
  ) as OriginLocation | undefined;

  const machalHarkashaLocation = useSelector((state: RootState) =>
    selectMachalProp(state, 'harkashaLocation'),
  ) as string | undefined;

  const machalHarkashaTime = useSelector((state: RootState) =>
    selectMachalProp(state, 'harkashaTime'),
  ) as string | undefined;

  const machalCaseType = useSelector((state: RootState) =>
    selectMachalProp(state, 'caseType'),
  );

  const onLocationChanged = (cityName: CityName) => {
    updateMachalProp('harkashaLocation', cityName || '');
  };

  return (
    <>
      <View style={globalStyles.fieldMargin}>
        <Picker
          style={globalStyles.inputGray}
          selectedValue={machalOriginLocation}
          onValueChange={(itemValue: OriginLocation) => {
            updateMachalProp('originLocation', itemValue);
          }}>
          <Picker.Item label="נלקח ב" value={undefined} />
          {Object.values(OriginLocation).map(location => (
            <Picker.Item key={location} label={location} value={location} />
          ))}
        </Picker>
      </View>

      <View style={globalStyles.fieldMargin}>
        <LocationInput
          onChange={onLocationChanged}
          value={machalHarkashaLocation}
        />
      </View>
      <View style={globalStyles.alignEnd}>
        <Text style={styles.harkashaTimeTitle}>מועד הרכשה:</Text>
        <Text style={styles.harkashaTimeValue}>{machalHarkashaTime}</Text>
      </View>
    </>
  );
};

export default HarkashaDetails;
