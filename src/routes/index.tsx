import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';

import { useAuth } from '../contexts/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EF694D',
  },
} as Theme;

const Routes = () => {
  const { signed, loading } = useAuth();

  return (
    <NavigationContainer theme={MyTheme}>
      {!signed ?
        <AppRoutes /> : <AuthRoutes />
      }
    </NavigationContainer>
  )
}


export default Routes;
