import {Selector} from '../config/types';
import {createApiInstance} from './api';

export const api = createApiInstance('/events/primary/active');

export const getPrimeEvents = async () => {
  return (await api.get<{primaryEvents: Selector[]}>('')).data.primaryEvents;
};
