import { Machals, MachalType } from "./types";

export const machals: Machals = [
  {
    id: '1',
    type: MachalType.unknownInjured,
    description: 'corp',
    gender: 'male',
    creatorId: 101,
    creatorFullName: 'John Doe',
    serverSyncStatus: 'needSync',
    viewStatus: 'new',
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-02-01T10:00:00Z',
    fingers: {
      1: {
        fingerIndex: 1,
        storageFileName: 'finger1.png',
        acquiredAt: '2025-02-01T09:00:00Z',
      },
    },
  },
  {
    id: '2',
    type: MachalType.unknownInjured,
    description: 'one-finger',
    gender: 'female',
    creatorId: 102,
    creatorFullName: 'Jane Smith',
    serverSyncStatus: 'needSync',
    viewStatus: 'viewed',
    createdAt: '2025-02-01T11:00:00Z',
    updatedAt: '2025-02-01T11:00:00Z',
    fingers: {
      2: {
        fingerIndex: 2,
        storageFileName: 'finger2.png',
        acquiredAt: '2025-02-01T10:30:00Z',
      },
    },
  },
  {
    id: '3',
    type: MachalType.deadSolider,
    description: 'palm',
    gender: 'unknown',
    creatorId: 103,
    creatorFullName: 'Alex Brown',
    serverSyncStatus: 'needSync',
    viewStatus: 'new',
    createdAt: '2025-02-01T12:00:00Z',
    updatedAt: '2025-02-01T12:00:00Z',
    fingers: {
      3: {
        fingerIndex: 3,
        storageFileName: 'finger3.png',
        acquiredAt: '2025-02-01T11:45:00Z',
      },
    },
  },
  {
    id: '4',
    type: MachalType.unknownInjured,
    description: 'corp',
    gender: 'male',
    creatorId: 104,
    creatorFullName: 'Michael Johnson',
    serverSyncStatus: 'needSync',
    viewStatus: 'viewed',
    createdAt: '2025-02-01T13:00:00Z',
    updatedAt: '2025-02-01T13:00:00Z',
    fingers: {},
  },
  {
    id: '5',
    type: MachalType.deadSolider,
    description: 'one-finger',
    gender: 'female',
    creatorId: 105,
    creatorFullName: 'Emily Davis',
    serverSyncStatus: 'needSync',
    viewStatus: 'new',
    createdAt: '2025-02-01T14:00:00Z',
    updatedAt: '2025-02-01T14:00:00Z',
    fingers: {
      5: {
        fingerIndex: 5,
        storageFileName: 'finger5.png',
        acquiredAt: '2025-02-01T13:30:00Z',
      },
    },
  },
  {
    id: '6',
    type: MachalType.deadSolider,
    description: 'palm',
    gender: 'male',
    creatorId: 106,
    creatorFullName: 'Chris Wilson',
    serverSyncStatus: 'needSync',
    viewStatus: 'new',
    createdAt: '2025-02-01T15:00:00Z',
    updatedAt: '2025-02-01T15:00:00Z',
    fingers: {
      6: {
        fingerIndex: 6,
        storageFileName: 'finger6.png',
        acquiredAt: '2025-02-01T14:45:00Z',
      },
    },
  },
  {
    id: '7',
    type: MachalType.unknownInjured,
    description: 'corp',
    gender: 'unknown',
    creatorId: 107,
    creatorFullName: 'Jordan Lee',
    serverSyncStatus: 'needSync',
    viewStatus: 'viewed',
    createdAt: '2025-02-01T16:00:00Z',
    updatedAt: '2025-02-01T16:00:00Z',
    fingers: {},
  },
  {
    id: '8',
    type: MachalType.deadSolider,
    description: 'one-finger',
    gender: 'female',
    creatorId: 108,
    creatorFullName: 'Sophia Martinez',
    serverSyncStatus: 'needSync',
    viewStatus: 'new',
    createdAt: '2025-02-01T17:00:00Z',
    updatedAt: '2025-02-01T17:00:00Z',
    fingers: {
      8: {
        fingerIndex: 8,
        storageFileName: 'finger8.png',
        acquiredAt: '2025-02-01T16:30:00Z',
      },
    },
  },
  {
    id: '9',
    type: MachalType.deadSolider,
    description: 'palm',
    gender: 'male',
    creatorId: 109,
    creatorFullName: 'David Kim',
    serverSyncStatus: 'needSync',
    viewStatus: 'viewed',
    createdAt: '2025-02-01T18:00:00Z',
    updatedAt: '2025-02-01T18:00:00Z',
    fingers: {},
  },
  {
    id: '10',
    type: MachalType.deadSolider,
    description: 'corp',
    gender: 'female',
    creatorId: 110,
    creatorFullName: 'Olivia Clark',
    serverSyncStatus: 'needSync',
    viewStatus: 'new',
    createdAt: '2025-02-01T19:00:00Z',
    updatedAt: '2025-02-01T19:00:00Z',
    fingers: {
      10: {
        fingerIndex: 10,
        storageFileName: 'finger10.png',
        acquiredAt: '2025-02-01T18:45:00Z',
      },
    },
  },
];