import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../../theme/hook/useTheme';
import {ButtonProps} from './Button.types';

const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  style = {},
  label,
  disabled = false,
  selected = false,
  primary = true,
  ...props
}) => {
  const globalStyles = useTheme();
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={[
        primary ? globalStyles.primaryButton : globalStyles.secondaryButton,
        selected && globalStyles.secondaryButtonActive,
        disabled && globalStyles.buttonDisabled,
        style.container,
      ]}
      onPress={onPress}>
      {label && (
        <Text
          style={[
            primary
              ? globalStyles.primaryButtonText
              : globalStyles.secondaryButtonText,
            selected && globalStyles.secondaryButtonTextActive,
            disabled && globalStyles.buttonDisabledText,
            style.label,
          ]}>
          {label}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};

export default Button;
