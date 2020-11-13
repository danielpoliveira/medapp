import React, { useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, Modal } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Entypo, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, } from '@expo/vector-icons';

import ActionSheet from 'react-native-actionsheet';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

import { CapitalizeFirstLetter } from '../../utils/strings';

const estadoCivilOptions = ['solteiro', 'casado', 'divorciado', 'viúvo', 'cancelar'];
const tipoSanguineoOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'cancelar'];

const NewPatient = ({ navigation }: any) => {
  const refEstadoCivilActionSheet = useRef(null) as any;
  const refTipoSanguineoActionSheet = useRef(null) as any;

  const [date, setDate] = useState(new Date(Date.now()));
  const [dateText, setDateText] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<IOSMode>('date');
  const [show, setShow] = useState(false);

  const [estadoCivil, setEstadoCivil] = useState<number>('' as any);
  const [tipoSanguineo, setTipoSanguineo] = useState<number>('' as any);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => <HeaderBackButton {...props} label="Voltar" />,
      headerRight: () => <HeaderRightButtom />,
    });
  }, [navigation]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    setDateText(moment(currentDate).format('DD/MM/YYYY'));
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const HeaderRightButtom = () => (
    <TouchableOpacity onPress={() => { }} style={styles.saveContainer}>
      <Text style={styles.saveText}>salvar</Text>
    </TouchableOpacity>
  );

  const showEstadoCivilActionSheet = () => {
    if (refEstadoCivilActionSheet.current)
      refEstadoCivilActionSheet.current.show();
  }

  const showTipoSanguineoActionSheet = () => {
    if (refTipoSanguineoActionSheet.current)
      refTipoSanguineoActionSheet.current.show();
  }

  const handleEstadoCivilActionSheetPress = (buttonIndex: number) => {
    if (buttonIndex < estadoCivilOptions.length - 1) {
      setEstadoCivil(buttonIndex);
    }
  }

  const handleTipoSanguineoActionSheetPress = (buttonIndex: number) => {
    if (buttonIndex < tipoSanguineoOptions.length - 1) {
      setTipoSanguineo(buttonIndex);
    }
  }

  const RenderActionSheet = ({ title, options, mode }: any) => {
    const endIndex = options.length - 1;

    return (
      <ActionSheet
        ref={mode === 'estadoCivil' ? refEstadoCivilActionSheet : refTipoSanguineoActionSheet}
        tintColor={'#555'}
        title={title}
        options={options.map((option: string) => CapitalizeFirstLetter(option))}
        cancelButtonIndex={endIndex}
        destructiveButtonIndex={endIndex}
        onPress={mode === 'estadoCivil' ? handleEstadoCivilActionSheetPress : handleTipoSanguineoActionSheetPress}
      />
    )
  }

  return (
    <React.Fragment>
      {show &&
        (Platform.OS === 'ios' ?
          (<Modal visible={true} transparent animationType={'fade'}>
            <View style={{ flex: 1, backgroundColor: '#00000050', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ borderRadius: 12.5, width: '90%', backgroundColor: '#FFF', overflow: 'hidden' }}>
                <View style={styles.datetimePickerOptions}>
                  <TouchableOpacity onPress={() => setShow(false)}>
                    <Text style={{ fontSize: 19, color: '#f20000' }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShow(false)}>
                    <Text style={{ fontSize: 19, color: 'blue' }}>Ok</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  locale="pt-BR"
                  onChange={onChange}
                />
              </View>
            </View>
          </Modal>)
          :
          (<DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={onChange}
          />)
        )
      }

      <ScrollView>
        <View style={{ flexDirection: 'column', alignItems: 'center' }} >
          <View style={{ width: 80, height: 80, backgroundColor: 'gray', marginTop: 20, borderRadius: 50 }} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#EF694D', marginTop: 10, }}>Adicionar Foto</Text>
        </View>

        <View style={{paddingTop: 30}}>
          <View style={{ paddingTop: 20, width: '90%', alignSelf: 'center' }}>
            <Text style={{ fontSize: 18, color: '#333', fontWeight: 'bold' }}>Informações principais</Text>
          </View>

          <View style={styles.inputView}>
            <View style={styles.column}>
              <MaterialIcons name="face" size={18} color="#777" />
              <TextInput placeholder="Nome completo" style={{ padding: 10, fontSize: 20 }} />
            </View>
          </View>

          <TouchableOpacity
            onPress={showDatepicker}
            style={styles.inputView}
          >
            <View style={styles.column}>
              <FontAwesome5 name="birthday-cake" size={18} color="#777" />
              <TextInput
                editable={false}
                placeholder={dateText ?? 'Selecione'}
                style={{
                  padding: 10,
                  fontSize: 20
                }}
              />
            </View>
            <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} color="#777 "/>
          </TouchableOpacity>

          <View
            style={styles.inputView}
          >
            <View style={styles.column}>
              <FontAwesome5 name="id-card" size={18} color="#777" />
              <TextInput
                placeholder="CPF"
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
          </View>

          <View
            style={styles.inputView}
          >
            <View style={styles.column}>
              <FontAwesome5 name="id-card" size={18} color="#777" />
              <TextInput
                placeholder="RG"
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
          </View>

          <View
            style={styles.inputView}
          >
            <View style={styles.column}>
              <MaterialCommunityIcons name="home-city-outline" size={18} color="#777" />
              <TextInput
                placeholder="Naturalidade"
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={showEstadoCivilActionSheet}
            style={styles.inputView}
          >
            <View style={styles.column}>
              <Entypo name="documents" size={18} color="#777" />
              <TextInput
                editable={false}
                placeholder={
                  CapitalizeFirstLetter(estadoCivilOptions[estadoCivil] ?? 'selecione')
                }
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
            <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} color="#777 "/>
            <RenderActionSheet title="Selecione o estado civil" options={estadoCivilOptions} mode="estadoCivil" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={showTipoSanguineoActionSheet}
            style={styles.inputView}
          >
            <View style={styles.column}>
              <Fontisto name="blood-drop" size={18} color="#777" />
              <TextInput
                editable={false}
                placeholder={
                  CapitalizeFirstLetter(tipoSanguineoOptions[tipoSanguineo] ?? 'selecione')
                }
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
            <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} color="#777 "/>
            <RenderActionSheet title="Selecione o tipo sanguíneo" options={tipoSanguineoOptions} mode="tipoSanguineo" />

          </TouchableOpacity>

          <View
            style={styles.inputView}
          >
            <View style={styles.column}>
              <Fontisto name="mobile-alt" size={18} color="#777" />
              <TextInput
                placeholder="Celular"
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
          </View>

          <View
            style={styles.inputView}
          >
            <View style={styles.column}>
              <FontAwesome5 name="whatsapp" size={18} color="#777" />
              <TextInput
                placeholder="WhatsApp"
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
          </View>

          <View style={{ paddingTop: 20, width: '90%', alignSelf: 'center' }}>
            <Text style={{ fontSize: 18, color: '#333', fontWeight: 'bold' }}>Plano de saúde</Text>
          </View>

          <View
            style={styles.inputView}
          >
            <View style={styles.column}>
              <MaterialIcons name="local-hospital" size={18} color="#777" />
              <TextInput
                placeholder="Convênio"
                style={{
                  padding: 10,
                  fontSize: 20
                }}
              />
            </View>
          </View>

          <View
            style={styles.inputView}
          >
            <View style={styles.column}>
              <MaterialIcons name="attach-money" size={18} color="#777" />
              <TextInput
                placeholder="Plano"
                style={{
                  padding: 10,
                  fontSize: 20
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </React.Fragment >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputView: {
    paddingHorizontal: 5,
    paddingVertical:5,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#777',
    alignSelf: 'center',
  },

  datetimePickerOptions: {
    flexDirection: 'row',
    backgroundColor: '#eaeaea',
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12.5,
  },

  column: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightIcon: {
    marginLeft: 10
  },

  saveContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  saveText: {
    fontSize: 17,
    color: '#EF694D',
    fontWeight: '600',
    textTransform: 'uppercase',
  },

});

export default NewPatient;