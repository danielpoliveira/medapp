import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, } from "react-native";
import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import { useStatusBarMode } from '../../contexts/statusBarMode';
import ListSelector from '../../components/ListSelector';

import api from '../../services/api';

const Patients = ({ navigation }: any) => {
  const { changeStatusBarMode, changeStatusBarBackground } = useStatusBarMode();
  const [data, setData] = useState([]);

  async function loadPatients() {
    const res = await api.get('/user/pacientes/all/').then(res => {
      setData(res.data);
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarMode('dark');
      changeStatusBarBackground('#FFFFFF');

      loadPatients();
    }, [])
  );

  useEffect(() => {

  }, []);

  return (
    <React.Fragment>
      <View style={styles.container}>
        <ListSelector mode="page" data={data} navigation={navigation} />
      </View>

      <View style={[styles.addContainer]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewPatient')}
          style={styles.buttom}
        >
          <Octicons name="diff-added" size={22.5} color="#FFFFFF" />
          <Text style={{ fontSize: 20, color: '#FFFFFF', marginLeft: 10 }}>Novo paciente</Text>
        </TouchableOpacity>
      </View>


    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  renderContainer: {
    paddingVertical: 20,
    marginHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa'
  },

  renderText: {
    fontSize: 16,
  },

  addContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttom: {
    backgroundColor: '#EF694D',
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,

    shadowColor: "#555",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },

  search: {

  }
});

export default Patients;