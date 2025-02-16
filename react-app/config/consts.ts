import packageJson from '../../package.json';
export const APP_VERSION = packageJson.version;

export const HEADER_KEYS = {
  Sites: 'X-TC-Site-Ids',
};

export const API_BASE_URL =
  'https://hotam.dev.digital.idf.il/api/field/development';
export const LOCATION_API = '4b0f1b6fee24371fc7f9f7ce8c48e72a';
export const SITES_ID_STORAGE_KEY = 'siteId';
export const GARBAGE_LAST_CHECK_KEY = 'garbageLastCheck';
export const MSAL_SCOPE = 'api://tik-chalal-dev/all';
export const LOGIN_NOTIFICATION_ID = 'login-required';
export const SYNC_SUCCESS_NOTIFICATION_ID = 'sync-success';
export const SYNC_FAILED_NOTIFICATION_ID = 'sync-failed';

export const ONE_DAY = 24 * 60 * 60 * 1000;

export const NO_FINGER_ENUM = {
  NO_FINGER: 'NO_FINGER',
  FINGER_CUT: 'FINGER_CUT',
  FINGER_BURNED: 'FINGER_BURNED',
  OTHER: 'OTHER',
} as const;

export const FINGERS = {
  THUMB_LEFT: 'THUMB_LEFT',
  INDEX_FINGER_LEFT: 'INDEX_FINGER_LEFT',
  MIDDLE_FINGER_LEFT: 'MIDDLE_FINGER_LEFT',
  RING_FINGER_LEFT: 'RING_FINGER_LEFT',
  LITTLE_FINGER_LEFT: 'LITTLE_FINGER_LEFT',
  THUMB_RIGHT: 'THUMB_RIGHT',
  INDEX_FINGER_RIGHT: 'INDEX_FINGER_RIGHT',
  MIDDLE_FINGER_RIGHT: 'MIDDLE_FINGER_RIGHT',
  RING_FINGER_RIGHT: 'RING_FINGER_RIGHT',
  LITTLE_FINGER_RIGHT: 'LITTLE_FINGER_RIGHT',
} as const;

export const FINGERS_TO_NUMBERS = {
  [FINGERS.THUMB_RIGHT]: 1,
  [FINGERS.INDEX_FINGER_RIGHT]: 2,
  [FINGERS.MIDDLE_FINGER_RIGHT]: 3,
  [FINGERS.RING_FINGER_RIGHT]: 4,
  [FINGERS.LITTLE_FINGER_RIGHT]: 5,
  [FINGERS.THUMB_LEFT]: 6,
  [FINGERS.INDEX_FINGER_LEFT]: 7,
  [FINGERS.MIDDLE_FINGER_LEFT]: 8,
  [FINGERS.RING_FINGER_LEFT]: 9,
  [FINGERS.LITTLE_FINGER_LEFT]: 10,
};

export const FINGER_LABELS = {
  [FINGERS.THUMB_LEFT]: 'אגודל שמאל',
  [FINGERS.THUMB_RIGHT]: 'אגודל ימין',
  [FINGERS.INDEX_FINGER_LEFT]: 'אצבע שמאל',
  [FINGERS.INDEX_FINGER_RIGHT]: 'אצבע ימין',
  [FINGERS.MIDDLE_FINGER_LEFT]: 'אמה שמאל',
  [FINGERS.MIDDLE_FINGER_RIGHT]: 'אמה ימין',
  [FINGERS.RING_FINGER_LEFT]: 'קמיצה שמאל',
  [FINGERS.RING_FINGER_RIGHT]: 'קמיצה ימין',
  [FINGERS.LITTLE_FINGER_LEFT]: 'זרת שמאל',
  [FINGERS.LITTLE_FINGER_RIGHT]: 'זרת ימין',
} as const;

export const FINGER_SCAN_ORDER = [
  [FINGERS.THUMB_LEFT, FINGERS.THUMB_RIGHT],
  [FINGERS.INDEX_FINGER_LEFT, FINGERS.INDEX_FINGER_RIGHT],
  [FINGERS.MIDDLE_FINGER_LEFT, FINGERS.MIDDLE_FINGER_RIGHT],
  [FINGERS.RING_FINGER_LEFT, FINGERS.RING_FINGER_RIGHT],
  [FINGERS.LITTLE_FINGER_LEFT, FINGERS.LITTLE_FINGER_RIGHT],
];

export const FINGER_SCAN_ORDER_BY_HAND = [
  FINGERS.THUMB_LEFT,
  FINGERS.INDEX_FINGER_LEFT,
  FINGERS.MIDDLE_FINGER_LEFT,
  FINGERS.RING_FINGER_LEFT,
  FINGERS.LITTLE_FINGER_LEFT,
  FINGERS.THUMB_RIGHT,
  FINGERS.INDEX_FINGER_RIGHT,
  FINGERS.MIDDLE_FINGER_RIGHT,
  FINGERS.RING_FINGER_RIGHT,
  FINGERS.LITTLE_FINGER_RIGHT,
];

export const FINGER_IMAGE_MAP = {
  [FINGERS.THUMB_LEFT]: {
    done: 'left_1_done',
    error: 'left_1_error',
    select: 'left_1_select',
    complete: 'leftComplete1',
  },
  [FINGERS.INDEX_FINGER_LEFT]: {
    done: 'left_2_done',
    error: 'left_2_error',
    select: 'left_2_select',
    complete: 'leftComplete2',
  },
  [FINGERS.MIDDLE_FINGER_LEFT]: {
    done: 'left_3_done',
    error: 'left_3_error',
    select: 'left_3_select',
    complete: 'leftComplete3',
  },
  [FINGERS.RING_FINGER_LEFT]: {
    done: 'left_4_done',
    error: 'left_4_error',
    select: 'left_4_select',
    complete: 'leftComplete4',
  },
  [FINGERS.LITTLE_FINGER_LEFT]: {
    done: 'left_5_done',
    error: 'left_5_error',
    select: 'left_5_select',
    complete: 'leftComplete5',
  },
  [FINGERS.THUMB_RIGHT]: {
    done: 'right_1_done',
    error: 'right_1_error',
    select: 'right_1_select',
    complete: 'rightComplete1',
  },
  [FINGERS.INDEX_FINGER_RIGHT]: {
    done: 'right_2_done',
    error: 'right_2_error',
    select: 'right_2_select',
    complete: 'rightComplete2',
  },
  [FINGERS.MIDDLE_FINGER_RIGHT]: {
    done: 'right_3_done',
    error: 'right_3_error',
    select: 'right_3_select',
    complete: 'rightComplete3',
  },
  [FINGERS.RING_FINGER_RIGHT]: {
    done: 'right_4_done',
    error: 'right_4_error',
    select: 'right_4_select',
    complete: 'rightComplete4',
  },
  [FINGERS.LITTLE_FINGER_RIGHT]: {
    done: 'right_5_done',
    error: 'right_5_error',
    select: 'right_5_select',
    complete: 'rightComplete5',
  },
};

export const NO_FINGER_LABELS = {
  [NO_FINGER_ENUM.NO_FINGER]: 'אצבע לא קיימת',
  [NO_FINGER_ENUM.FINGER_CUT]: 'אצבע קטועה',
  [NO_FINGER_ENUM.FINGER_BURNED]: 'אצבע שרופה',
  [NO_FINGER_ENUM.OTHER]: 'אחר',
} as const;

export const PRIMARY_EVENTS = 'primaryEvents';

export const ANYTHING_BUT_NUMBERS_REGEX = new RegExp(/[^0-9]/g);
export const HEBREW_NAME_REGEX = new RegExp(/[^\u0590-\u05FF\s-']/g);
export const MEZAH_LITE_LONG_MACHAL_REGEX = new RegExp(/^(15|25|35)\d{8}$/);
export const REQUEST_TIMEOUT = 20000;
export const DEFAULT = 'default';
