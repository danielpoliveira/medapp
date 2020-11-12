import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabs from './bottomTabs.routes';

import NewShedule from '../pages/NewShedule';
import Patient    from '../pages/Patient';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <>
      <ExpoStatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BottomTabs" component={BottomTabs} 
            options={{
              headerShown: false,
            }} 
          />
          <Stack.Screen name="NewShedule" component={NewShedule} />
          <Stack.Screen name="Patient"    component={Patient} />
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
}

export default Routes;