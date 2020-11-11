import React from 'react';
import { View, StyleSheet } from 'react-native';
import Routes from './routes';

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