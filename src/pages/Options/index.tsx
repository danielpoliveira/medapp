import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import { useStatusBarMode } from '../../contexts/statusBarMode';
import { useAuth } from '../../contexts/auth';

const Options = () => {
  const { changeStatusBarMode, changeStatusBarBackground, } = useStatusBarMode();
  const { signOut } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarMode('dark');
      changeStatusBarBackground('#FFFFFF');
    }, [])
  );

  const handleSignOut = () => {
    signOut();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.text}>Sair do app</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create ({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },

  button: {
    backgroundColor: '#EF694D',
    padding: 25,
    borderRadius: 15,
  },

  text: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Options;