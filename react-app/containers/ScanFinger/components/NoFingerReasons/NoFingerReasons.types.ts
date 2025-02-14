import {NO_FINGER_ENUM} from '../../../../config/consts';
import getGlobalStyles from '../../../../theme/global.styles';

export type NoFingerReasonsProps = {
  onSelect: (value: keyof typeof NO_FINGER_ENUM) => void;
  value: keyof typeof NO_FINGER_ENUM | null;
  globalStyles: ReturnType<typeof getGlobalStyles>;
};
