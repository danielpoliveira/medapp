import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabs from './bottomTabs.routes';

import Shedule from '../pages/Shedule';
import NewShedule from '../pages/NewShedule';
import Patient from '../pages/Patient';
import NewPatient from '../pages/NewPatient';

const AppStack = createStackNavigator();

const screenOptions: any = {
  headerTitleStyle: { alignSelf: 'center' },
};

const AppRoutes = () => {
  return (
    <AppStack.Navigator screenOptions={screenOptions}>
      <AppStack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Shedule"
        options={{ headerTitle: 'Agendamento' }}
        component={Shedule}
      />
      <AppStack.Screen
        name="Patient"
        options={{ headerTitle: 'Paciente' }}
        component={Patient}
      />

      <AppStack.Screen
        name="NewPatient"
        options={{ headerTitle: 'Cadastrar paciente' }}
        component={NewPatient}
      />

      <AppStack.Screen
        name="NewShedule"
        options={{ headerTitle: 'Novo agendamento' }}
        component={NewShedule}
      />
    </AppStack.Navigator>
  );
}

export default AppRoutes;