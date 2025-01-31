import React from 'react';
import {View, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Button} from '@react-navigation/elements';

function App(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Bodies')}>
        Go to Bodies
      </Button>
    </View>
  );
}

export default App;
