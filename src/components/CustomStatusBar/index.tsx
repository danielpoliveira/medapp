import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useStatusBarMode } from '../../contexts/statusBarMode';

const CustomStatusBar = () => {
  const { background, mode } = useStatusBarMode();
  return (
    <View style={{
      paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
      backgroundColor: background,
    }} >
      <ExpoStatusBar style={mode} backgroundColor={background}/>
    </View>
  );
}

export default CustomStatusBar;
