import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import moment from 'moment';
moment.locale('pt-br');

interface EmptyDateComponentProps {
  date: any;
}

const EmptyDateComponent = ({ date }: EmptyDateComponentProps) => {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.message}
      >
        {`Sem agendamentos para o dia ${moment(date).format('DD [de] MMMM [de] YYYY')}`}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  message: {
    padding: 10,
    fontSize: 19,
    lineHeight: 30,
    textAlign: 'center',
    color: '#777'
  }
});

export default EmptyDateComponent;