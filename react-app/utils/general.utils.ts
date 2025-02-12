import {MEZAH_LITE_LONG_MACHAL_REGEX} from '../config/consts';
import {
  CaseType,
  FingerprintsBody,
  FingersObject,
  Machal,
} from '../config/types';

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

export const prepareStateToSend = (machal: Machal): FingerprintsBody => {
  const {
    scannerId,
    scanMode,
    syncStatus,
    syncFailedReason,
    syncAttemts,
    viewStatus,
    fingers,
    createdAt,
    updatedAt,
    ...mezahCaseMetaData
  } = machal;
  // go over fingers and build correct fingers object
  return {
    ...fingers,
    mahal_id: mezahCaseMetaData.id,
    scanner_id: scannerId,
    caseMetaData: convertToBase64(JSON.stringify(mezahCaseMetaData)),
    isManualSubmit: false,
  } as FingerprintsBody;
};
