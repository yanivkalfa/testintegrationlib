import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {LOCATION_API} from '../../config/consts';
import {
  ErrorTypes,
  CityDetails,
  Coordinates,
  LocationError,
  Position,
} from './LocationInput.types';

const fetchCurrentLocation = async (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    Geolocation.requestAuthorization(
      () => {
        const configs = {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        };
        Geolocation.getCurrentPosition(
          position => resolve(position as Position),
          error => reject({type: ErrorTypes.POSITION, error} as LocationError),
          configs,
        );
      },
      error => reject({type: ErrorTypes.PERMISSIONS, error} as LocationError),
    );
  });
};

const fetchLocationDetails = async ({
  latitude,
  longitude,
}: Coordinates): Promise<CityDetails[]> => {
  try {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${LOCATION_API}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw {type: ErrorTypes.API_ERROR, error} as LocationError;
  }
};

export const fetchCurrentLocationDetails = async (): Promise<
  CityDetails[] | undefined
> => {
  const position = await fetchCurrentLocation();
  console.log('position', position);
  return fetchLocationDetails(position.coords);
};

export const getCurrentCity = (
  locationDetails: CityDetails[],
): string | undefined => {
  const city = locationDetails[0];
  if (city?.local_names?.he) {
    return city.local_names.he;
  }
  return city?.name;
};
