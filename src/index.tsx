import React from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import Routes from './routes';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  }
})

export default App;