import React from 'react';
import { View, Platform, StatusBar, StyleSheet, } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

interface CustomStatusBarProps {
  background: string;
  mode: 'dark' | 'light';
}
const CustomStatusBar = ({ background, mode }: CustomStatusBarProps) => {
  return useIsFocused() ? (
    <View style={[styles.container, { backgroundColor: background, }]}>
      <ExpoStatusBar style={mode} backgroundColor={background} /> 
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    height: STATUSBAR_HEIGHT,
  },
});

export default CustomStatusBar;
