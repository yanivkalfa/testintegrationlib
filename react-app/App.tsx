import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Logger from './containers/Logger/Logger';
import Home from './containers/Home/Home';
import Bodies from './containers/Bodies/Bodies';

const Stack = createNativeStackNavigator();
const homeRoute = 'Home';

export default function App() {
  return (
    <NavigationContainer>
      <Logger />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Bodies" component={Bodies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
