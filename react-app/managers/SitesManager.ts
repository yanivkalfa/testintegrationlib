import {InternalAxiosRequestConfig} from 'axios';
import {vault} from './StorageManager';
import {HEADER_KEYS, SITES_ID_STORAGE_KEY} from '../config/consts';

export const setHeaders = async (req: InternalAxiosRequestConfig<any>) => {
  const siteId = await getCurrSiteId();
  req.headers[HEADER_KEYS.Sites] = JSON.stringify([siteId]);
};

export const getCurrSiteId = async () => {
  const siteObject = await vault.get(SITES_ID_STORAGE_KEY);
  return siteObject?.[SITES_ID_STORAGE_KEY];
};

export const setSiteId = async (siteId: string) => {
  vault.set(SITES_ID_STORAGE_KEY, {[SITES_ID_STORAGE_KEY]: siteId});
};
