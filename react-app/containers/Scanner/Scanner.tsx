import React, {useEffect, useRef} from 'react';
import {View, DeviceEventEmitter} from 'react-native';
import Canvas from 'react-native-canvas';

import globalStyles from '../../global.styles';
import {styles} from './Scanner.styles';

import {loadAndDrawImage} from './Scanner.utils';
import {ScannerProps} from './Scanner.types';

const Scanner: React.FC<ScannerProps> = ({onScanCompleted, value}) => {
  const canvasRef = useRef(null);
  const loadingRef = useRef(false);
  const lastImgSrc = useRef(null);

  useEffect(() => {
    const onCaptureUpdatedListener = DeviceEventEmitter.addListener(
      'onCaptureUpdated',
      async base64Image => {
        if (value || loadingRef.current || lastImgSrc.current === base64Image) {
          return false;
        }

        lastImgSrc.current = base64Image;
        loadingRef.current = true;
        const canvas = canvasRef.current;
        await loadAndDrawImage(canvas, base64Image);
        loadingRef.current = false;
      },
    );

    const onCaptureCompleteListener = DeviceEventEmitter.addListener(
      'onCaptureCompleted',
      onScanCompleted,
    );

    return () => {
      onCaptureCompleteListener.remove();
      onCaptureUpdatedListener.remove();
    };
  }, []);

  useEffect(() => {
    loadAndDrawImage(canvasRef.current, value);
  }, [value]);

  return (
    <View style={[globalStyles.section, globalStyles.sectionFullHeight]}>
      <Canvas ref={canvasRef} style={styles.canvas} />
    </View>
  );
};

export default Scanner;
