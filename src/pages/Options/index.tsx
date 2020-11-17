import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth';
import CustomStatusBar from '../../components/CustomStatusBar';

const Options = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => signOut();

  return (
    <React.Fragment>
      <CustomStatusBar background="#FFFFFF" mode="dark" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignOut}
        >
          <Feather name="log-out" size={22.5} color="#FFF" />
          <Text style={styles.text}>Sair do app</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    backgroundColor: '#EF694D',
    padding: 25,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    color: '#FFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default Options;