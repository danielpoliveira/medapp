import React, {
  useRef,
  useState,
  useLayoutEffect,
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

import moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import { useStatusBarMode } from '../../contexts/statusBarMode';

const actionSheetOptions = ['Compareceu', 'Não compareceu', 'Cancelar'];

const NewShedule = ({ navigation }: any) => {
  const refActionSheet = useRef(null) as any;

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState<IOSMode>('date');
  const [show, setShow] = useState(false);

  const [dateText, setDateText] = useState<string | undefined>(undefined);
  const [timeText, setTimeText] = useState<string | undefined>(undefined);

  const [selectActionSheet, setSelectActionSheet] = useState<number>('' as any);

  const { changeStatusBarMode, changeStatusBarBackground } = useStatusBarMode();

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
    <TouchableOpacity onPress={() => { }} style={styles.saveContainer}>
      <Text style={styles.saveText}>Save</Text>
    </TouchableOpacity>
  );

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);

    if (selectedDate) {
      if (mode === 'date')
        setDateText(moment(currentDate).format('DD/MM/YYYY'));
      else
        setTimeText(moment(currentDate).format('hh:mm A'));
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

  const handleActionSheetPress = (buttonIndex: number) => {
    if (buttonIndex < actionSheetOptions.length - 1)
      setSelectActionSheet(buttonIndex);
  }

  const showActionSheet = () => {
    if (refActionSheet.current)
      refActionSheet.current.show();
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
              <Text style={styles.text}>{dateText ?? 'Informe a data'}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={showTimepicker} style={styles.row}>
            <View style={styles.column}>
              <Ionicons name='ios-timer' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Hora</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{timeText ?? 'Informe a hora'}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Patient')}
          >
            <View style={styles.column}>
              <Fontisto name='heartbeat-alt' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Paciente</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>Selecione</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('Patient')}
          >
            <View style={styles.column}>
              <MaterialCommunityIcons name='doctor' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Médico</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>Selecione</Text>
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