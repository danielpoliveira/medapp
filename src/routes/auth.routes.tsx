import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <AuthStack.Navigator 
      screenOptions={{
        headerShown: false,
      }} 
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;