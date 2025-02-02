import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './Details.styles';
import {
  useCameraPermission,
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {updateCurrentMachal} from '../../store/machalSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../config/types';

const Details = () => {
  return (
    <View style={styles.container}>
      <Text>Some Form Fields</Text>
    </View>
  );
};

export default Details;
