import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';

import {styles} from './LocationInput.styles';

import {
  fetchCurrentLocationDetails,
  getCurrentCity,
} from './LocationInput.utils';
import {
  CityName,
  ErrorTypes,
  LocationError,
  LocationInputProps,
} from './LocationInput.types';

import LocationIcon from './components/LocationIcon/LocationIcon';
import {useTheme} from '../../theme/hook/useTheme';

const Errors = {
  [ErrorTypes.POSITION]: 'Unable to fetch location',
  [ErrorTypes.PERMISSIONS]: 'Permissions missing',
  [ErrorTypes.API_ERROR]: 'Could not get details from location',
};

const LocationInput: React.FC<LocationInputProps> = ({onChange, value}) => {
  const globalStyles = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (cityName: CityName) => {
    onChange(cityName);
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const locationDetails = await fetchCurrentLocationDetails();
      const cityName = locationDetails
        ? getCurrentCity(locationDetails)
        : undefined;
      handleChange(cityName);
      setError(null);
    } catch (e) {
      const locationError = e as LocationError;
      setError(Errors[locationError.type] || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View>
      <View style={[globalStyles.inputGray, styles.container]}>
        <View style={[globalStyles.row]}>
          <TouchableOpacity
            onPress={getCurrentLocation}
            style={styles.iconContainer}>
            <LocationIcon color={error ? 'red' : undefined} />
          </TouchableOpacity>
          {loading && (
            <ActivityIndicator
              style={styles.spinner}
              size="small"
              color="#1565FF"
            />
          )}
        </View>
        <TextInput
          style={globalStyles.inputGray}
          value={value}
          placeholder={'מיקום הרשאה *'}
          onChangeText={text => handleChange(text)}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default LocationInput;
