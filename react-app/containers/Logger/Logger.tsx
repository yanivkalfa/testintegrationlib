import React, {useEffect} from 'react';
import {View, DeviceEventEmitter} from 'react-native';

function Logger(): React.JSX.Element {
  useEffect(() => {
    const LoggerListner = DeviceEventEmitter.addListener(
      'onNativeLog',
      event => {
        console.log(`NATIVELOG: ${event.log}`);
      },
    );

    return () => {
      LoggerListner.remove();
    };
  }, []);
  return <View></View>;
}

export default Logger;
