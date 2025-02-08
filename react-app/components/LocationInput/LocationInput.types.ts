export enum ErrorTypes {
  POSITION = 'position',
  PERMISSIONS = 'permissions',
  API_ERROR = 'apiError',
}

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Position = {
  coords: Coordinates;
};

export type CityDetails = {
  local_names?: {
    he?: string;
  };
  name?: string;
};

export type LocationError = {
  type: ErrorTypes;
  error: any;
};

export type LocationChanged = (
  locationDetails: CityDetails[] | undefined,
) => void;

export type CityName = string | undefined;
export type LocationInputProps = {
  onChange: (value: CityName) => void;
  value: string | undefined;
};
