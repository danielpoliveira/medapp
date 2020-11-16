import React from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';

interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
    >
      <View style={styles.container}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            color="#EF694D"
            animating={loading}
          />
        </View>
      </View>
    </Modal>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#00000050',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 150,
    width: 150,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default Loader;
