import {InteractionManager} from 'react-native';
import {
  FINGER_SCAN_ORDER,
  FINGER_SCAN_ORDER_BY_HAND,
  FINGERS,
  MEZAH_LITE_LONG_MACHAL_REGEX,
} from '../config/consts';
import {
  CaseType,
  FingerprintsBody,
  FingersObject,
  Machal,
  ServerFingerprint,
} from '../config/types';
import {readFile} from '../managers/FileManager';

const slice = (str: string, start: number, end?: number) =>
  str.slice(start, end);

export const MachalIdLength = {
  OLD: 9,
  NEW_MIN: 10,
  NEW_MAX: 12,
};

export const MachalIdStructure = {
  PREFIX: {
    startIndex: 0,
    endIndex: 1,
  },
  MAIN: {
    startIndex: 1,
    endIndex: 10,
  },
  SUFFIX: {
    startIndex: 10,
    endIndex: 12,
  },
};

export const formatInCaseOfLongMachal = (id: string) =>
  MEZAH_LITE_LONG_MACHAL_REGEX.test(id) ? slice(id, 1) : id;

export const formatMachalId = (id: string): string => {
  return `${formatMainId(getMainId(id))}${getSuffixWithDash(id)}`;
};

const formatMainId = (mainMachalId: string) => {
  return `${mainMachalId.slice(0, 3)}-${mainMachalId.slice(
    3,
    6,
  )}-${mainMachalId.slice(6, 9)}`;
};

const getMainId = (id: string) => {
  if (id.length < MachalIdLength.NEW_MIN || id.length > MachalIdLength.NEW_MAX)
    return id;
  id =
    id.length !== MachalIdLength.OLD
      ? id.slice(
          MachalIdStructure.MAIN.startIndex,
          MachalIdStructure.MAIN.endIndex,
        )
      : id;
  return id;
};

const getSuffixWithDash = (id: string) => {
  const suffix = getSuffix(id);
  return suffix ? `-${suffix}` : '';
};

const getSuffix = (id: string) => {
  if (id.length > MachalIdLength.NEW_MIN && id.length <= MachalIdLength.NEW_MAX)
    return `${id.slice(
      MachalIdStructure.SUFFIX.startIndex,
      MachalIdStructure.SUFFIX.endIndex,
    )}`;
  return '';
};

export const formatWoundedId = (id: string): string => {
  return `${id.slice(0, 2)}-${id.slice(2, 5)}-${id.slice(5, 8)}-${id.slice(
    8,
    11,
  )}`;
};

export const convertToBase64 = (str: string): string => {
  const utf8Bytes = new TextEncoder().encode(str);
  const base64String = btoa(String.fromCharCode(...utf8Bytes));
  return base64String;
};

export const isFingersObjectEmpty = (
  fingers: FingersObject | undefined | null,
): boolean => {
  return !fingers || Object.keys(fingers).length === 0;
};

/**
 * Runs an async operation after React Native interactions complete.
 *
 * @param operation - A function that returns a Promise.
 * @param args - Arguments to pass to the operation.
 * @returns A Promise resolving to the result of the operation.
 */
export const runNonBlockingOperation = <T>(
  operation: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<T> => {
  return new Promise((resolve, reject) => {
    InteractionManager.runAfterInteractions(() => {
      operation(...args)
        .then(resolve)
        .catch(reject);
    });
  });
};

export const prepareStateToSend = async (
  machal: Machal,
): Promise<FingerprintsBody> => {
  const {scannerId, fingers, ...mezahCaseMetaData} = machal;

  const newFingersEntries: [string, ServerFingerprint | string][] = [];

  for (const [fingerName, finger] of Object.entries(fingers)) {
    if (
      typeof finger === 'object' &&
      'storageFileName' in finger &&
      finger.storageFileName
    ) {
      const {storageFileName, ...rest} = finger;
      const base64 =
        (await runNonBlockingOperation(readFile, storageFileName)) || '';
      console.log('fingerName', fingerName);
      newFingersEntries.push([fingerName, {...rest, base64}]);
    } else {
      newFingersEntries.push([fingerName, finger]);
    }
  }

  return {
    ...Object.fromEntries(newFingersEntries),
    mahal_id: mezahCaseMetaData.id,
    scanner_id: scannerId,
    caseMetaData: convertToBase64(JSON.stringify(mezahCaseMetaData)),
    isManualSubmit: false,
  } as FingerprintsBody;
};

export const getNextFinger = (
  stateFingers: FingersObject,
): keyof typeof FINGERS | null => {
  for (const pair of FINGER_SCAN_ORDER) {
    for (const fingerKey of pair) {
      if (!(fingerKey in stateFingers) || !stateFingers[fingerKey]) {
        return fingerKey;
      }
    }
  }
  return null;
};

export const getNextFingerByHandSide = (
  stateFingers: FingersObject,
): keyof typeof FINGERS | null => {
  for (const fingerKey of FINGER_SCAN_ORDER_BY_HAND) {
    if (!(fingerKey in stateFingers) || !stateFingers[fingerKey]) {
      return fingerKey as keyof typeof FINGERS;
    }
  }
  return null;
};
