import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign, Fontisto, Ionicons } from '@expo/vector-icons';

import Shedule from '../pages/Shedule';
import Patient from '../pages/Patient';
import Options from '../pages/Options';

const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Shedule" component={Shedule} 
        options={{
          tabBarIcon: ({ color, focused, size }) => <AntDesign name="calendar" color={color} size={size} />
        }}
      />
      <BottomTab.Screen name="Patients" component={Patient} 
        options={{
          tabBarIcon: ({ color, focused, size }) => <Fontisto name="bed-patient" color={color} size={size} />
        }}
      />
      <BottomTab.Screen name="Options" component={Options}
        options={{
          tabBarIcon: ({ color, focused, size }) => <Ionicons name="ios-options" color={color} size={size} />
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabs;