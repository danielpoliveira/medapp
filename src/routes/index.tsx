import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabs from './bottomTabs.routes';

import NewShedule from '../pages/NewShedule';
import Patient from '../pages/Patient';

import CustomStatusBar from '../components/CustomStatusBar';

const Stack = createStackNavigator();

const screenOptions: any = {
  headerTitleStyle: { alignSelf: 'center' },
};

const Routes = () => {
  return (
    <>
      <CustomStatusBar />
      <NavigationContainer >
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewShedule"
            options={{ headerTitle: 'Novo Agendamento' }}
            component={NewShedule}
          />
          <Stack.Screen
            name="Patient"
            options={{ headerTitle: 'Paciente' }}
            component={Patient}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Routes;