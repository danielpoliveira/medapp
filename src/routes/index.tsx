import React from 'react';
//import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabs from './bottomTabs.routes';
import NewShedule from '../pages/NewShedule';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <>
      <ExpoStatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BottomTabs" component={BottomTabs} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="NewShedule" component={NewShedule} options={{
            //headerShown: false,
          }} />
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
}

export default Routes;