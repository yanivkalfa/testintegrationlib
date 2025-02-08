import {SitesResponse} from '../config/types';
import {createApiInstance} from './api';

export const api = createApiInstance('/auth/mezahSites');

export const getMySites = async () => {
  return (await api.get<SitesResponse>(``)).data.sites;
};
