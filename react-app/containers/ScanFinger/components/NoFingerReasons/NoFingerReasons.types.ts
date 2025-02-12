import {NO_FINGER_ENUM} from '../../../../config/consts';

export type NoFingerReasonsProps = {
  onSelect: (value: keyof typeof NO_FINGER_ENUM) => void;
  value: keyof typeof NO_FINGER_ENUM | null;
};
