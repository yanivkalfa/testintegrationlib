export type RootStackParamList = {
  Home: undefined;
  Atzada: undefined;
  Details: undefined;
  ScanModeSelector: undefined;
  ScanFingerPrintSelector: undefined;
  ScanFinger: undefined
};

export type ConfigState = {
  imgFolderCreated: boolean;
  isOnline: boolean;
  isLoggedIn: boolean;
  isDeviceConnected: boolean;
  connectedDeviceName: string;
}

export type UpdateConfigPayload<K extends keyof ConfigState = keyof ConfigState> = {
  name: K;
  value: ConfigState[K];
};

export type FingerPrint = {
  fingerIndex: number;
  storageFileName: string;
  acquiredAt: string;
};

export enum MachalType {
  deadSolider = 'dead-solider',
  unknownInjured = 'unknown-injured',
};

export enum OriginLocation {
  Maanach = 'מאנ"ח',
  Machon = "מכון",
  Shetach = "שטח",
}

export const OriginLocationCodes = {
  [OriginLocation.Machon]: 1,
  [OriginLocation.Maanach]: 2,
  [OriginLocation.Shetach]: 3,
}

export const CaseAcquisitionLocationType = {
  [OriginLocation.Maanach]: 1,
  [OriginLocation.Machon]: 2,
  [OriginLocation.Shetach]: 3,
}

export enum HarkashaDescription {
  CORPSE = "גופה שלמה",
  PALM = "כף יד",
  FINGER = "אצבע",
  FINGER_PART = "חלק מאצבע",
  OTHER = "לא ידוע",
}

export type Selector = {
  id: number
  name: string
}

export type AddSelector = {
  id: number
  name?: string
}

export type EnumOrSelector = {
  id?: number
  name: string
}

export enum Gender {
  Male = "זכר",
  Female = "נקבה",
  Unknown = "לא ידוע",
}

export type MachalReq = {
  id: string
  gender: Gender
  mimtza?: AddSelector
  primaryEvent: EnumOrSelector
  secondaryEvent: string
  originLocation: OriginLocation
  harkashaLocation: string
  harkashaTime: string
  markishIdNumber: string
  markishName: string
  fingers: Partial<Record<number, FingerPrint>>;
}

export type Machal = MachalReq & {
  type: MachalType.unknownInjured | MachalType.deadSolider;
  gender: Gender
  serverSyncStatus: 'needSync' | 'synced' | 'deleted';
  viewStatus: 'new' | 'viewed';
  createdAt: string;
  updatedAt: string;
};

export type Machals = Machal[];


export type Site = {
  id: string
  name: string
}

export type SiteResponse = Site

export type SitesResponse = { sites: Site[] }

export type PrimaryEvent = { id: number; name: string }
