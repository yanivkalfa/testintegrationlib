import Corpse from '../../assets/icons/harkashaDescription/corpse.svg';
import Palm from '../../assets/icons/harkashaDescription/palm.svg';
import Finger from '../../assets/icons/harkashaDescription/finger.svg';
import FingerPart from '../../assets/icons/harkashaDescription/fingerPart.svg';
import Other from '../../assets/icons/harkashaDescription/other.svg';

export const iconMap: Record<string, React.FC<any>> = {
  CORPSE: Corpse,
  PALM: Palm,
  FINGER: Finger,
  FINGER_PART: FingerPart,
  OTHER: Other,
} as const;
