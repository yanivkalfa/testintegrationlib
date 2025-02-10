import {REQUEST_TIMEOUT} from '../config/consts';
import {FingerprintsBody} from '../config/types';
import {createApiInstance} from './api';

export const api = createApiInstance('/fingerprints/case', REQUEST_TIMEOUT);

export const upsertCase = async (caseId: string, data: FingerprintsBody) => {
  return await api.post(`/${caseId}`, data);
};
