import { InternalAxiosRequestConfig } from 'axios';
import { vault } from './StorageManager';
import { HEADER_KEYS, SITES_ID_STORAGE_KEY } from '../config/consts';

export const setHeaders = (req: InternalAxiosRequestConfig<any>) => {
  const siteId = getCurrSiteId();
  req.headers[HEADER_KEYS.Sites] = JSON.stringify([siteId])
}

export const getCurrSiteId = () => {
  return vault.get(SITES_ID_STORAGE_KEY);
}

export const setSiteId = (siteId: string) => {
  vault.set(SITES_ID_STORAGE_KEY, siteId);
}