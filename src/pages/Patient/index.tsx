import React, { useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, ImageProps } from "react-native";
import { HeaderBackButton } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { useStatusBarMode } from '../../contexts/statusBarMode';
import { useFocusEffect } from '@react-navigation/native';

const infoData = [{
  id: 1,
  nascimento: "07/12/1999",
  estadoCivil: "Casado",
  Naturalidade: "Maranhão",
  CPF: "61906410321",
  RG: "1234567890",
  FatorSanguineo: "0+",
  Convenio: "UNIMED",
  Plano: "Especial",
  Matricula: "12345"
}];

const Patient = ({ navigation, route }: any) => {
  const { changeStatusBarMode, changeStatusBarBackground, } = useStatusBarMode();

  const { patient } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => <HeaderBackButton {...props} label="Voltar" />,
      headerRight: () => <HeaderRightButtom />,
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarMode('dark');
      changeStatusBarBackground('#FFFFFF');
    }, [])
  );

  const HeaderRightButtom = () => (
    <TouchableOpacity onPress={() => { }} style={styles.printContainer}>
      <AntDesign name="printer" size={22} />
    </TouchableOpacity>
  );

  const renderSeparatorView = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CEDCCE",
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.PerfilContainer}>
        <Image source={{ uri: 'https://avatars1.githubusercontent.com/u/38728374?s=460&u=038545e1533ecb70dd66e646eb51fb48105c379c&v=4' }} style={{ height: 70, width: 70, borderRadius: 100 }} />
        <View style={styles.PerfilContainerText}>
          <Text style={styles.Name}>{patient.nome}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>21 anos</Text>
            <Text style={{ paddingHorizontal: 3.5, fontSize: 16, }}>•</Text>
            <Text>Masculino</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.Info}>
        <Text style={{ padding: 15, fontWeight: 'bold' }}>Informações Principais</Text>
        <View style={styles.InfoTextView}>
          <Text>Data de Nascimento  </Text>
          <Text>07/12/1999</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.InfoTextView}>
          <Text>Estado Civil  </Text>
          <Text>{patient.estado_civil}</Text>
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
          <Text>Matricula</Text>
          <Text>{patient.id}</Text>
        </View>
        <View style={styles.line} />
      </ScrollView>
    </View >
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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