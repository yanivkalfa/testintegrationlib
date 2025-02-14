import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import {styles} from './FingerButton.styles';
import {
  FINGER_IMAGE_MAP,
  FINGER_LABELS,
  NO_FINGER_ENUM,
  NO_FINGER_LABELS,
} from '../../../config/consts';
import {FingerButtonProps} from './FingerButton.types';
import SvgIcon from '../../../components/SvgIcon/SvgIcon';

const FingerButton: React.FC<FingerButtonProps> = ({
  onPress,
  fingerKey,
  fingerData,
  hasImage = false,
  isNoFinger = false,
  ...props
}) => {
  const statusText = hasImage
    ? 'נסרק'
    : isNoFinger && fingerData
    ? NO_FINGER_LABELS[fingerData as keyof typeof NO_FINGER_ENUM]
    : 'טרם נסרק';

  if (!fingerKey) {
    return null;
  }
  let status = 'select';
  if (hasImage) {
    status = 'done';
  }

  if (isNoFinger) {
    status = 'error';
  }

  return (
    <TouchableOpacity {...props} onPress={onPress} style={styles.fingerButton}>
      <View style={styles.fingerButtonLeft}>
        <SvgIcon
          name={
            FINGER_IMAGE_MAP[fingerKey][
              status as keyof (typeof FINGER_IMAGE_MAP)[keyof typeof FINGER_IMAGE_MAP]
            ]
          }
          width={45}
          height={70}
        />
      </View>
      <View style={styles.fingerButtonRight}>
        <View style={styles.handContainer}>
          {status === 'done' && (
            <SvgIcon name={'complete'} width={89} height={35} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.fingerText}>{FINGER_LABELS[fingerKey]}</Text>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FingerButton;
