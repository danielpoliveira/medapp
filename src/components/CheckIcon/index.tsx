import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

interface CheckIconProps {
  status: string | any;
}

const CheckIcon = ({ status }: CheckIconProps) => {
  const name =
    status === 'em andamento'? 
      'md-time' 
    :
    status === 'Compareceu'? 
      'md-checkmark' 
    :
      'md-close';

  const color =
    status === 'em andamento'? 
      '#0288d1' 
    :
    status === 'Compareceu'? 
      '#43a047' 
    :
      '#f4511e';

  return (
    <Ionicons
      style={styles.icon}
      name={name}
      color={color}
      size={20}
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20, 
    textAlign: "center",
  }
});

export default CheckIcon;