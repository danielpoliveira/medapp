import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign, Fontisto, Ionicons } from '@expo/vector-icons';

import Shedules from '../pages/Shedules';
import Patients from '../pages/Patients';
import Options from '../pages/Options';

const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Shedules" component={Shedules}
        options={{
          tabBarLabel: 'Agendamentos',
          tabBarIcon: ({ color, focused, size }) => <AntDesign name="calendar" color={color} size={size} />
        }}
      />
      <BottomTab.Screen name="Patients" component={Patients}
        options={{
          tabBarLabel: 'Pacientes',
          tabBarIcon: ({ color, focused, size }) => <Fontisto name="bed-patient" color={color} size={size} />
        }}
      />

      <BottomTab.Screen name="Options" component={Options}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color, focused, size }) => <Ionicons name="ios-options" color={color} size={size} />
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabs;