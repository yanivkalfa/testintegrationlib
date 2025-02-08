import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import LocationIcon from './components/LocationIcon/LocationIcon';
import {styles} from './LocationInput.styles';
import {
  fetchCurrentLocationDetails,
  getCurrentCity,
} from './LocationInput.utils';
import {
  CityName,
  ErrorTypes,
  LocationChanged,
  LocationError,
  LocationInputProps,
} from './LocationInput.types';

const Errors = {
  [ErrorTypes.POSITION]: 'Unable to fetch location',
  [ErrorTypes.PERMISSIONS]: 'Permissions missing',
  [ErrorTypes.API_ERROR]: 'Could not get details from location',
};

const LocationInput: React.FC<LocationInputProps> = ({onChange, value}) => {
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
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={'מיקום הרשאה *'}
          onChangeText={text => handleChange(text)}
        />
        {loading && (
          <ActivityIndicator
            style={styles.spinner}
            size="small"
            color="#1565FF"
          />
        )}
        <TouchableOpacity
          onPress={getCurrentLocation}
          style={styles.iconContainer}>
          <LocationIcon color={error ? 'red' : undefined} />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default LocationInput;
