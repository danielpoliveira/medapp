import _ from 'lodash';

import React, {
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  ScrollView,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';
import 'moment/locale/pt-br';

import { useDropDown } from '../../contexts/dropDown';

import ListSelector from '../../components/ListSelector';
import CustomStatusBar from '../../components/CustomStatusBar';

import api from '../../services/api';

moment.locale('pt-br');

const NewShedule = ({ navigation }: any) => {
  const { ref } = useDropDown();

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState<IOSMode>('date');
  const [show, setShow] = useState(false);

  const [selectPatientMode, setSelectPatientMode] = useState(false);
  const [selectMedicMode, setSelectMedicMode] = useState(false);

  const [medicSelected, setMedicSelected] = useState<any>(undefined);
  const [patientSelected, setPatientSelected] = useState<any>(undefined);

  const [dateText, setDateText] = useState<any>(undefined);
  const [timeText, setTimeText] = useState<any>(undefined);

  const [medic, setMedic] = useState([]);
  const [patient, setPatient] = useState([]);

  const [save, setSave] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => <HeaderBackButton {...props} label="Voltar" />,
      headerRight: () => <HeaderRightButtom />,
    });
  }, [navigation, save]);

  useFocusEffect(
    React.useCallback(() => {
      setPatientSelected(undefined);
      setMedicSelected(undefined);
      setDateText(undefined);
      setTimeText(undefined);
    }, [])
  );

  useEffect(() => {
    setSelectPatientMode(false);
  }, [patientSelected]);

  useEffect(() => {
    setSelectMedicMode(false);
  }, [medicSelected]);

  useEffect(() => {
    if (
      !_.isEmpty(patientSelected) &&
      !_.isEmpty(medicSelected) &&
      dateText &&
      timeText
    )
      setSave(true);

  }, [patientSelected, medicSelected, dateText, timeText]);

  async function handleSavePress() {
    if (save) {
      const datetime = moment(moment(dateText).format('YYYY-MM-DD') + ' ' + moment(timeText).format('HH:mm:ss'))

      await api.post('/user/agendamentos/new/', {
        paciente: patientSelected?.id,
        medico: medicSelected?.id,
        datetime: moment(datetime).format(),
      }).then(res => {
        ref
          .current
          .alertWithType("success", "Sucesso!", 'Agendamento criado com sucesso');

        navigation.navigate('Shedules');
      }).catch(err => {
        const msg =
          err.response &&
            err.response.data ?
            err.response.data
            :
            undefined;
        ref
          .current
          .alertWithType('error', "Erro!", msg.errors);
      });
    }
  }

  const HeaderRightButtom = () => (
    <TouchableOpacity
      disabled={!save}
      onPress={handleSavePress}
      style={styles.saveContainer}
    >
      <Text style={[styles.saveText, !save && { color: '#ccc' }]}>Save</Text>
    </TouchableOpacity>
  );

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);

    if (selectedDate) {
      if (mode === 'date') {
        setDateText(moment(currentDate));
      } else {
        setTimeText(moment(currentDate));
      }
    }
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  async function handleMedicSelectPress() {
    const res = await api.get('/medics/all/')
      .then(res => {
        setMedic(res.data);
        setSelectMedicMode(true);
      });
  }

  async function handlePatientSelectPress() {
    const res = await api.get('/user/pacientes/all/')
      .then(res => {
        setPatient(res.data);
        setSelectPatientMode(true);
      });
  }

  return (
    <React.Fragment>
      <CustomStatusBar background="#FFFFFF" mode="dark" noHeight />
      <ListSelector
        mode="selector"
        data={patient}
        visible={selectPatientMode}
        setVisible={setSelectPatientMode}
        setSelect={setPatientSelected}
      />
      <ListSelector
        mode="selector"
        data={medic}
        visible={selectMedicMode}
        setVisible={setSelectMedicMode}
        setSelect={setMedicSelected}
      />

      {show &&
        (Platform.OS === 'ios' ?
          (<Modal visible={true} transparent animationType={'fade'}>
            <View style={{ flex: 1, backgroundColor: '#00000050', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ borderRadius: 12.5, width: '90%', backgroundColor: '#FFF', overflow: 'hidden' }}>
                <View style={styles.datetimePickerOptions}>
                  <TouchableOpacity onPress={() => setShow(false)}>
                    <Text style={{ fontSize: 19, color: '#f20000' }}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShow(false)}>
                    <Text style={{ fontSize: 19, color: 'blue' }}>Selecionar</Text>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  locale="pt-BR"
                  display="default"
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
        <View style={styles.container}>
          <TouchableOpacity onPress={showDatepicker} style={styles.row}>
            <View style={styles.column}>
              <Ionicons name='ios-calendar' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Data</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{dateText ? moment(dateText).format('DD/MM/YYYY') : 'Selecione a data'}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={showTimepicker} style={styles.row}>
            <View style={styles.column}>
              <Ionicons name='ios-timer' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Hora</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{timeText ? moment(timeText).format('hh:mm A') : 'Selecione a hora'}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={handlePatientSelectPress}
          >
            <View style={styles.column}>
              <Fontisto name='heartbeat-alt' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Paciente</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{patientSelected?.nome ?? 'Selecione'}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={handleMedicSelectPress}
          >
            <View style={styles.column}>
              <MaterialCommunityIcons name='doctor' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Médico</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{medicSelected?.nome ?? 'Selecione'}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  saveContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  saveText: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: '#EF694D',
  },

  text: {
    fontSize: 18,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 12.5,
    borderColor: '#aaa',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  column: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftIcon: {
    marginRight: 10,
    width: 20,
  },

  rightIcon: {
    marginLeft: 10
  },

});

export default NewShedule;