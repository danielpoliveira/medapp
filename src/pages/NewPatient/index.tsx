import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, Modal, Image } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Entypo, FontAwesome5, Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, } from '@expo/vector-icons';

const icon = (name: string) => <Ionicons key={name} name={name} size={24} />;

import * as ImagePicker from 'expo-image-picker';

import moment from 'moment';
import 'moment/locale/pt-br';

import { useActionSheet } from '@expo/react-native-action-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';

import { CapitalizeFirstLetter } from '../../utils/strings';

import api from '../../services/api';
import CustomStatusBar from '../../components/CustomStatusBar';

moment.locale('pt-br');

const NewPatient = ({ navigation }: any) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const sexoOptions = [
    'homem', 'mulher', 'nao definido', 'cancelar'
  ];

  const estadoCivilOptions = [
    'solteiro', 'casado', 'divorciado', 'viúvo', 'cancelar'
  ];

  const tipoSanguineoOptions = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'cancelar'
  ];

  const picOptions = [
    'Tirar uma nova foto',
    'Escolher da galeria',
    'Cancelar',
  ];

  const [date, setDate] = useState(new Date(Date.now()));
  const [dateText, setDateText] = useState<any>(undefined);

  const [mode, setMode] = useState<IOSMode>('date');
  const [show, setShow] = useState(false);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [naturalidade, setNaturalidade] = useState('');

  const [selectSexo, setSelectSexo] = useState<any>(undefined);
  const [selectEstadoCivil, setSelectEstadoCivil] = useState<any>(undefined);
  const [selectTipoSanguineo, setSelectTipoSanguineo] = useState<any>(undefined);

  const [celular, setCelular] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const [convenio, setConvenio] = useState('');
  const [planoSaude, setPlanoSaude] = useState('');

  const [image, setImage] = useState<any>('');

  const [save, setSave] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => <HeaderBackButton {...props} label="Voltar" />,
      headerRight: () => <HeaderRightButtom />,
    });
  }, [navigation, save, image]);

  useEffect(() => {
    async function loadCameraRollPermitions() {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Descule, precisamos de permissões de acesso da biclioteca da câmera para fazer isso funcionar!');
        }
      }
    };

    async function loadCameraPermitions() {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Descule, precisamos de permissões de acesso da câmera para fazer isso funcionar!');
        }
      }
    };

    loadCameraPermitions()
    loadCameraRollPermitions();
  }, []);

  useEffect(() => {
    if (
      nome && cpf && rg &&
      dateText && naturalidade &&
      !!sexoOptions[selectSexo] &&
      !!estadoCivilOptions[selectEstadoCivil] &&
      !!tipoSanguineoOptions[selectTipoSanguineo] &&
      celular && whatsapp &&
      convenio &&
      planoSaude
    ) {
      setSave(true);
    } else {
      setSave(false)
    }
  },
    [
      nome,
      cpf,
      rg,
      dateText,
      naturalidade,
      selectSexo,
      selectEstadoCivil,
      selectTipoSanguineo,
      celular,
      whatsapp,
      convenio,
      planoSaude,
    ]);

  const showPicOnGalery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then(res => {
      if (!res.cancelled) {
        setImage(res);
      }
    });
  }

  const showPicOnCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then(res => {      
      if (!res.cancelled) {
        setImage(res);
      }
    });
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    setDateText(moment(currentDate));
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  async function handleSavePress() {
    if (save) {
      const auxData = new FormData();

      auxData.append('nome', nome);
      auxData.append('sexo', sexoOptions[selectSexo]);
      auxData.append('data_nascimento', moment(dateText).format('YYYY-MM-DD'));
      auxData.append('cpf', cpf);
      auxData.append('rg', rg);
      auxData.append('naturalidade', naturalidade);
      auxData.append('estado_civil', estadoCivilOptions[selectEstadoCivil]);
      auxData.append('tipo_sanguineo', tipoSanguineoOptions[selectTipoSanguineo]);
      auxData.append('celular', celular);
      auxData.append('whatsapp', whatsapp);
      auxData.append('convenio', convenio);
      auxData.append('plano', planoSaude);

      auxData.append('photo', {
        name: image.uri.split('/').pop(),
        uri: image.uri,
        type: 'image/jpeg',
      });
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; charset=utf-8;'
        }
      }

      const res = await api.post('/user/pacientes/new', auxData, config)
      .then(res => {
        navigation.navigate('Shedules');
      });
    }
  }

  const HeaderRightButtom = () => (
    <TouchableOpacity
      disabled={!save}
      onPress={handleSavePress}
      style={styles.saveContainer}
    >
      <Text style={[styles.saveText, !save && styles.saveDisabled]}>salvar</Text>
    </TouchableOpacity>
  );

  const showPicActionSheet = () => {
    const icons = [icon('ios-camera'), icon('md-photos'), icon('md-close')]

    showActionSheetWithOptions({
      options: picOptions,
      icons,
      cancelButtonIndex: 2,
      title: 'Selecione o modo de captura',
    }, (index: number) => {

      if (index == 0) 
        showPicOnCamera();
      else if (index === 1)
        showPicOnGalery();
    });
  }


  const showSexoActionSheet = () => {
    showActionSheetWithOptions({
      options: sexoOptions,
      cancelButtonIndex: 3,
      title: 'Selecione o seu sexo',
    }, (index: number) => {

      setSelectSexo(index !== 3 ? index : '');
    });
  }

  const showEstadoCivilActionSheet = () => {
    showActionSheetWithOptions({
      options: estadoCivilOptions,
      cancelButtonIndex: 4,
      title: 'Selecione o seu estado civil',
    }, (index: number) => {

      setSelectEstadoCivil(index !== 4 ? index : '');
    });
  }

  const showTipoSanguineoActionSheet = () => {
    showActionSheetWithOptions({
      options: tipoSanguineoOptions,
      cancelButtonIndex: 8,
      title: 'Selecione o seu tipo sanguíneo',
    }, (index: number) => {

      setSelectTipoSanguineo(index !== 8 ? index : '');
    });
  }

  const handleChooseAvatarPress = () => {
    showPicActionSheet();
  }

  return (
    <React.Fragment>
      <CustomStatusBar background="#FFFFFF" mode="dark" />

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
          {image ?
            <Image style={styles.avatar} source={{ uri: image.uri }} />
            :
            <View style={styles.avatar} />
          }

          <TouchableOpacity
            onPress={handleChooseAvatarPress}
            style={{
              marginTop: 10,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#EF694D', }}>Adicionar Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 30 }}>
          <View style={{ paddingTop: 20, width: '90%', alignSelf: 'center' }}>
            <Text style={{ fontSize: 18, color: '#333', fontWeight: 'bold' }}>Informações principais</Text>
          </View>

          <View style={styles.inputView}>
            <View style={styles.column}>
              <MaterialIcons name="face" size={18} color="#777" />
              <TextInput
                value={nome}
                onChangeText={setNome}
                placeholder="Nome completo"
                style={{ padding: 10, fontSize: 20 }}
              />
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
                placeholder={
                  dateText ?
                    moment(dateText).format('DD [de] MMMM [de] YYYY')
                    :
                    'Selecione a data'
                }
                style={{
                  padding: 10,
                  fontSize: 20
                }}
              />
            </View>
            <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} color="#777777" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={showSexoActionSheet}
            style={styles.inputView}
          >
            <View style={styles.column}>
              <Ionicons name="md-transgender" size={18} color="#777" />
              <TextInput
                editable={false}
                placeholder={
                  CapitalizeFirstLetter(sexoOptions[selectSexo] ?? 'sexo')
                }
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
            <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} color="#777777" />
          </TouchableOpacity>

          <View
            style={styles.inputView}
          >
            <View style={styles.column}>
              <FontAwesome5 name="id-card" size={18} color="#777777" />
              <TextInput
                value={cpf}
                onChangeText={setCpf}
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
              <FontAwesome5 name="id-card" size={18} color="#777777" />
              <TextInput
                value={rg}
                onChangeText={setRg}
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
              <MaterialCommunityIcons name="home-city-outline" size={18} color="#777777" />
              <TextInput
                value={naturalidade}
                onChangeText={setNaturalidade}
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
                  CapitalizeFirstLetter(estadoCivilOptions[selectEstadoCivil] ?? 'estado civil')
                }
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
            <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} color="#777777" />
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
                  CapitalizeFirstLetter(tipoSanguineoOptions[selectTipoSanguineo] ?? 'tipo sanguíneo')
                }
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
              />
            </View>
            <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} color="#777777" />
          </TouchableOpacity>

          <View
            style={styles.inputView}
          >
            <View style={styles.column}>
              <Fontisto name="mobile-alt" size={18} color="#777" />
              <TextInput
                value={celular}
                onChangeText={setCelular}
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
                value={whatsapp}
                onChangeText={setWhatsapp}
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
                value={convenio}
                onChangeText={setConvenio}
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
                value={planoSaude}
                onChangeText={setPlanoSaude}
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

  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'gray',
    marginTop: 20,
    borderRadius: 50
  },

  inputView: {
    paddingHorizontal: 5,
    paddingVertical: 5,
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

  saveDisabled: {
    color: '#ccc'
  }

});

export default NewPatient;