import React from 'react';
import {iconMap} from './SvgIcon.icons';
import {SvgIconProps} from './SvgIcon.types';
import {Text} from 'react-native';

const SvgIcon: React.FC<SvgIconProps> = ({name, width = 30, height = 30}) => {
  const IconComponent = iconMap[name] as React.FC<any>;

  if (!IconComponent) {
    return <Text>Invalid Icon</Text>;
  }

  return <IconComponent width={width} height={height} />;
};

export default SvgIcon;
