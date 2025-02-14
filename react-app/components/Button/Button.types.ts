import {TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';

export type ButtonProps = {
  onPress: () => void;
  children?: React.ReactNode;
  style?: {
    container?: ViewStyle;
    label?: TextStyle;
  };
  label?: string;
  disabled?: boolean;
  selected?: boolean;
  primary?: boolean;
} & TouchableOpacityProps;
