import React, {useEffect, useRef} from 'react';
import {View, DeviceEventEmitter} from 'react-native';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import {styles} from './Scanner.styles';
import globalStyles from '../../global.styles';

const getBase64ImgUri = (base64Image: string) => {
  return `data:image/png;base64,${base64Image}`;
};

const loadAndDrawImage = async (
  canvas: Canvas,
  base64Image: string,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const context = canvas.getContext('2d');
    const img = new CanvasImage(canvas);
    img.src = getBase64ImgUri(base64Image);
    img.addEventListener('load', () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve();
    });

    img.addEventListener('error', reject);
  });
};

type ScannerProps = {
  onScanCompleted: (base64Image: string) => void;
  value: string;
};

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
