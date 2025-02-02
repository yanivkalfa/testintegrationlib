import React from 'react';
import {View, Text, NativeModules} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';

import {Button} from '@react-navigation/elements';
import {RootStackParamList} from '../../config/types';

import {useDispatch, useSelector} from 'react-redux';
import {increment} from '../../store/slices';
import {RootState} from '../../store/store';
const {Scheduler} = NativeModules;
console.log('Scheduler', Scheduler);

function App(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const counterValue = useSelector((state: RootState) => state.counter.value);

  const handlePress = () => {
    Scheduler.stopService();
    console.log('handlePresshandlePresshandlePresshandlePress');
    navigation.navigate('Bodies');
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={handlePress}>Go to Bodies</Button>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Counter: {counterValue}</Text>
        <Button onPress={() => dispatch(increment())}>Increment Counter</Button>
      </View>
    </View>
  );
}

export default App;
