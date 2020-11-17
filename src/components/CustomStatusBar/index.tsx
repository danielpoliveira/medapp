import React from 'react';
import { View, Platform, StatusBar, } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

interface CustomStatusBarProps {
  background: string;
  noHeight?: boolean;
  mode: 'dark' | 'light';
}
const CustomStatusBar = ({ background, mode, noHeight }: CustomStatusBarProps) => {
  return useIsFocused()
    ?
    <View
      style={{
        backgroundColor: background,
        height: noHeight ? 0 : STATUSBAR_HEIGHT
      }}
    >
      <ExpoStatusBar style={mode} backgroundColor={background} />
    </View>
    :
    null;
}

export default CustomStatusBar;
