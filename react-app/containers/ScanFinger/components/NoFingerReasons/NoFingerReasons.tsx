import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './NoFingerReasons.styles';
import globalStyles from '../../../../global.styles';
import {NO_FINGER_ENUM, NO_FINGER_LABELS} from '../../../../config/consts';

type NoFingerReasonsProps = {
  onSelect: (value: keyof typeof NO_FINGER_ENUM) => void;
  value: keyof typeof NO_FINGER_ENUM | null;
};

const NoFingerReasons: React.FC<NoFingerReasonsProps> = ({onSelect, value}) => {
  const reasons = Object.keys(
    NO_FINGER_ENUM,
  ) as (keyof typeof NO_FINGER_ENUM)[];

  const handleReasonSelect = (reason: keyof typeof NO_FINGER_ENUM) => {
    onSelect(reason);
  };

  return (
    <View style={[globalStyles.sectionHorizontal, globalStyles.spacer]}>
      {reasons.map(reason => (
        <TouchableOpacity
          key={reason}
          style={[
            globalStyles.abortButton_12,
            value === reason && globalStyles.actionButtonSelected,
          ]}
          onPress={() => handleReasonSelect(reason)}>
          <Text
            style={[
              globalStyles.textSize_12,
              value === reason && globalStyles.actionButtonSelected,
            ]}>
            {NO_FINGER_LABELS[NO_FINGER_ENUM[reason]]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default NoFingerReasons;
