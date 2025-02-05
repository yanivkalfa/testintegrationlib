export type RootStackParamList = {
  Home: undefined;
  Atzada: undefined;
  Details: undefined;
  Auth: undefined;
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


export type Machal = {
  id: string;
  type: MachalType.unknownInjured | MachalType.deadSolider;
  description: 'corp' | 'one-finger' | 'palm';
  gender: 'male' | 'female' | 'unknown';
  creatorId: number;
  creatorFullName: string;
  serverSyncStatus: 'needSync' | 'synced' | 'deleted';
  viewStatus: 'new' | 'viewed';
  createdAt: string;
  updatedAt: string;
  fingers: Partial<Record<number, FingerPrint>>;
};

export type Machals = Machal[];