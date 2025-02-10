import {FingerprintsBody, FingersObject, Machal} from '../config/types';

export const convertToBase64 = (str: string): string => {
  const utf8Bytes = new TextEncoder().encode(str);
  const base64String = btoa(String.fromCharCode(...utf8Bytes));
  return base64String;
};

export const formatWoundedId = (id: string): string => {
  return `${id.slice(0, 2)}-${id.slice(2, 5)}-${id.slice(5, 8)}-${id.slice(
    8,
    11,
  )}`;
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
  console.log('mezahCaseMetaData', mezahCaseMetaData);
  return {
    ...fingers,
    mahal_id: mezahCaseMetaData.id,
    scanner_id: scannerId,
    caseMetaData: convertToBase64(JSON.stringify(mezahCaseMetaData)),
    isManualSubmit: false,
  } as FingerprintsBody;
};
