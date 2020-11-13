import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabs from './bottomTabs.routes';

import Shedule from '../pages/Shedule';
import Patient from '../pages/Patient';
import NewPatient from '../pages/NewPatient';

const Stack = createStackNavigator();

const screenOptions: any = {
  headerTitleStyle: { alignSelf: 'center' },
};

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EF694D',
  },
} as Theme;

const Routes = () => {
  return (
    <>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Shedule"
            options={{ headerTitle: 'Agendamento' }}
            component={Shedule}
          />
          <Stack.Screen
            name="Patient"
            options={{ headerTitle: 'Paciente' }}
            component={Patient}
          />

          <Stack.Screen
            name="NewPatient"
            options={{ headerTitle: 'Cadastrar paciente' }}
            component={NewPatient}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Routes;