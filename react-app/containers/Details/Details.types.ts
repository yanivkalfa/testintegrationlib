import {Machal} from '../../config/types';

export type UpdateMachalProp = <K extends keyof Machal>(
  key: K,
  value: Machal[K],
) => void;

export type EventDetailsProps = {
  updateMachalProp: UpdateMachalProp;
};
