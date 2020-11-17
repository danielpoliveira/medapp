import React, { useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";

import { HeaderBackButton } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { baseURL } from '../../services/api';

import moment from 'moment';
import 'moment/locale/pt-br';
import CustomStatusBar from '../../components/CustomStatusBar';

moment.locale('pt-br');

const Patient = ({ navigation, route }: any) => {
  const { patient } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => <HeaderBackButton {...props} label="Voltar" />,
      headerRight: () => <HeaderRightButtom />,
    });
  }, [navigation]);


  const handlerPrintPress = async () => { }

  const HeaderRightButtom = () => (
    <TouchableOpacity onPress={handlerPrintPress} style={styles.printContainer}>
      <AntDesign name="printer" size={22} />
    </TouchableOpacity>
  );

  return (
    <React.Fragment>
      <CustomStatusBar background="#FFFFFF" mode="dark" />

      <View style={styles.container}>
        <View style={styles.PerfilContainer}>
          <Image
            source={{
              uri: `${baseURL}/images/get/${patient.avatar_uri}`
            }}
            style={styles.avatar}
          />
          <View style={styles.PerfilContainerText}>
            <Text style={styles.Name}>{patient.nome}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{moment().diff(patient.data_nascimento, 'years')} anos</Text>
              <Text style={{ paddingHorizontal: 3.5, fontSize: 16, }}>•</Text>
              <Text style={{ textTransform: 'capitalize' }}>{patient.sexo}</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.Info}>
          <Text style={{ padding: 15, fontWeight: 'bold' }}>Informações Principais</Text>
          <View style={styles.InfoTextView}>
            <Text>Data de Nascimento  </Text>
            <Text>{moment(patient.data_nascimento).format('DD/MM/YYYY')}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.InfoTextView}>
            <Text>Estado Civil  </Text>
            <Text style={{ textTransform: 'capitalize' }}>{patient.estado_civil}</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.InfoTextView}>
            <Text>Naturalidade</Text>
            <Text>{patient.naturalidade}</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.InfoTextView}>
            <Text>CPF</Text>
            <Text>{patient.cpf}</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.InfoTextView}>
            <Text>RG</Text>
            <Text>{patient.rg}</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.InfoTextView}>
            <Text>Tipo Sanguineo</Text>
            <Text>{patient.tipo_sanguineo}</Text>
          </View>
          <View style={styles.line} />

          <Text style={{ padding: 15, fontWeight: 'bold' }}>Plano de Saúde</Text>

          <View style={styles.InfoTextView}>
            <Text>Convenio</Text>
            <Text>{patient.convenio}</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.InfoTextView}>
            <Text>Plano</Text>
            <Text>{patient.plano}</Text>
          </View>
          <View style={styles.line} />

          <View style={styles.InfoTextView}>
            <Text>Matricula (id)</Text>
            <Text>{patient.id}</Text>
          </View>
          <View style={styles.line} />
        </ScrollView>
      </View >

    </React.Fragment>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  avatar: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: '#ccc'
  },

  renderContainer: {
    padding: 10,
  },

  renderText: {

  },

  Name: {
    fontSize: 20,
    fontWeight: "bold"
  },

  PerfilContainer: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  PerfilContainerText: {
    flexDirection: "column",
    paddingLeft: 25
  },

  Info: {
    padding: 5,
  },

  InfoTextView: {
    padding: 15,
    justifyContent: 'space-between',
    flexDirection: "row"
  },

  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#CEDCCE",
  },

  printContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
  },

  printText: {
    fontSize: 18,
    textTransform: 'uppercase',
  },

});

export default Patient;