import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Text, View } from "react-native";
import { useStatusBarMode } from '../../contexts/statusBarMode';

const Options = () => {
  const { changeStatusBarMode, changeStatusBarBackground, } = useStatusBarMode();

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarMode('dark');
      changeStatusBarBackground('#FFFFFF');
    }, [])
  ); 
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pagina Options</Text>
    </View>
  )
}

export default Options;