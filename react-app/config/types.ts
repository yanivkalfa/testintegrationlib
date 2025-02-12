import {FINGERS, NO_FINGER_ENUM} from './consts';

export type RootStackParamList = {
  Home: undefined;
  Atzada: undefined;
  Details: undefined;
  ScanModeSelector: undefined;
  ScanFingerPrintSelector: undefined;
  ScanFinger: {finger: keyof typeof FINGERS};
};

export type ConfigState = {
  imgFolderCreated: boolean;
  theme: string;
  isOnline: boolean;
  isLoggedIn: boolean;
  isDeviceConnected: boolean;
  connectedDeviceName: string;
};

export type UpdateConfigPayload<
  K extends keyof ConfigState = keyof ConfigState,
> = {
  name: K;
  value: ConfigState[K];
};

export enum ScanMode {
  ManualScan = 'הרכשה ידנית',
  AutoScan = 'הרכשה אוטומטית',
}

export enum OriginLocation {
  Maanach = 'מאנ"ח',
  Machon = 'מכון',
  Shetach = 'שטח',
}

export const OriginLocationCodes = {
  [OriginLocation.Machon]: 1,
  [OriginLocation.Maanach]: 2,
  [OriginLocation.Shetach]: 3,
};

export const CaseAcquisitionLocationType = {
  [OriginLocation.Maanach]: 1,
  [OriginLocation.Machon]: 2,
  [OriginLocation.Shetach]: 3,
};

export enum HarkashaDescription {
  CORPSE = 'גופה שלמה',
  PALM = 'כף יד',
  FINGER = 'אצבע',
  FINGER_PART = 'חלק מאצבע',
  OTHER = 'לא ידוע',
}

export type Selector = {
  id: number;
  name: string;
};

export type AddSelector = {
  id: number;
  name?: string;
};

export type EnumOrSelector = {
  id?: number;
  name: string;
};

export enum Gender {
  Male = 'זכר',
  Female = 'נקבה',
  Unknown = 'לא ידוע',
}

export enum CaseType {
  Wounded = 'פצוע אלמוני',
  Machal = 'מחל',
}

export enum SyncStatus {
  NEED_SYNC = 'NEED_SYNC',
  SYNCED = 'SYNCED',
  SYNC_FAILED = 'SYNC_FAILED',
  SYNC_IN_PROGRESS = 'SYNC_IN_PROGRESS',
}

export enum ViewedStatus {
  NEW = 'NEW',
  VIEWED = 'VIEWED',
}

type FingersKeys = {
  [K in keyof typeof FINGERS]: {
    [K2 in K]: keyof typeof NO_FINGER_ENUM | string;
  };
}[keyof typeof FINGERS];

export type FingerFile = {
  base64?: string;
  storageFileName: string;
  height: number;
  width: number;
};

export type SelectedFinger = keyof typeof FINGERS | null;

export type Fingerprint = keyof typeof NO_FINGER_ENUM | FingerFile;

export type FingersObject = Partial<Record<keyof typeof FINGERS, Fingerprint>>;

export type FingersWithFiles = Partial<Record<number, FingerFile>>;

export type FingersWithoutFiles = Partial<
  Record<number, keyof typeof NO_FINGER_ENUM>
>;

export type MezahCaseMetaData = {
  id: string;
  gender: Gender;
  mimtza?: EnumOrSelector;
  primaryEvent: EnumOrSelector;
  secondaryEvent: string;
  originLocation: OriginLocation;
  harkashaLocation: string;
  harkashaTime: string;
  markishIdNumber: string;
  markishName: string;
  caseType: CaseType;
};

export type FingerprintsBody = FingersObject & {
  mahal_id: string;
  scanner_id: string;
  caseMetaData: string;
  isManualSubmit: boolean;
};

export type Machal = {
  id: string;
  caseType: CaseType;
  scanMode: ScanMode;
  syncStatus: SyncStatus;
  syncFailedReason?: string;
  syncAttemts: number;
  viewStatus: ViewedStatus;
  gender: Gender;
  mimtza?: AddSelector;
  primaryEvent: EnumOrSelector;
  secondaryEvent: string;
  originLocation: OriginLocation;
  harkashaLocation: string;
  harkashaTime: string;
  markishIdNumber: string;
  markishName: string;
  fingers: FingersObject;
  scannerId: string;
  createdAt: string;
  updatedAt: string;
};

export type Machals = Machal[];

export type Site = {
  id: string;
  name: string;
};

export type SiteResponse = Site;

export type SitesResponse = {sites: Site[]};

export enum PrimaryEvent {
  War = 'חרבות ברזל',
  Routine2024 = 'שגרה 2024',
}

export type NotificationPayload = {
  title: string;
  body: string;
  deepLink: string;
  id?: string;
};

export type DeviceDetails = {
  productName: string;
  fwVersion: string;
  serialNumber: string;
};
