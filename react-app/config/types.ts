export type RootStackParamList = {
  Home: undefined;
  Atzada: undefined;
  Details: undefined;
};

export type ConfigState = {
  imgFolderCreated: boolean;
  isOnline: boolean;
  isLoggedIn: boolean;
}

export type UpdateConfigPayload = {
  name: keyof ConfigState;
  value: boolean;
}

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