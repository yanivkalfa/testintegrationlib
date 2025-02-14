import {TouchableOpacityProps} from 'react-native';
import {FingersObject, SelectedFinger} from '../../../config/types';

export type FingerButtonProps = {
  onPress: () => void;
  fingerKey: SelectedFinger;
  fingerData?: FingersObject[keyof FingersObject];
  hasImage?: boolean;
  isNoFinger?: boolean;
} & TouchableOpacityProps;
