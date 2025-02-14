import React from 'react';
import {View} from 'react-native';

import {styles} from './NoFingerReasons.styles';

import {NO_FINGER_ENUM, NO_FINGER_LABELS} from '../../../../config/consts';
import {NoFingerReasonsProps} from './NoFingerReasons.types';
import Button from '../../../../components/Button/Button';

const NoFingerReasons: React.FC<NoFingerReasonsProps> = ({
  onSelect,
  value,
  globalStyles,
}) => {
  const reasons = Object.keys(
    NO_FINGER_ENUM,
  ) as (keyof typeof NO_FINGER_ENUM)[];

  const handleReasonSelect = (reason: keyof typeof NO_FINGER_ENUM) => {
    onSelect(reason);
  };

  return (
    <View style={[globalStyles.row]}>
      {reasons.map(reason => (
        <Button
          key={reason}
          primary={false}
          selected={value === reason}
          label={NO_FINGER_LABELS[NO_FINGER_ENUM[reason]]}
          style={{
            container: styles.noReasonButton,
            label: styles.noReasonButtonText,
          }}
          onPress={() => handleReasonSelect(reason)}
        />
      ))}
    </View>
  );
};

export default NoFingerReasons;
