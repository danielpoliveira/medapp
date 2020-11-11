import React from 'react';
//import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './bottomTabs.routes';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

const Routes = () => {
  return (
    <>
      <ExpoStatusBar style="dark" />
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </>
  );
}


export default Routes;