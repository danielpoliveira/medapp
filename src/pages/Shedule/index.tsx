import React, {
  useState,
  useLayoutEffect,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';

import { useActionSheet } from '@expo/react-native-action-sheet'
import { useFocusEffect } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Ionicons, Fontisto } from '@expo/vector-icons';

import moment from 'moment';
moment.locale('pt-br');

import { useStatusBarMode } from '../../contexts/statusBarMode';
import api from '../../services/api';

const Shedule = ({ navigation, route }: any) => {
  const { changeStatusBarMode, changeStatusBarBackground } = useStatusBarMode();
  const { showActionSheetWithOptions } = useActionSheet();

  const { item } = route.params;

  const [date, setDate] = useState(moment(item.datetime || Date.now()));
  const [selectActionSheet, setSelectActionSheet] = useState<number>(undefined as any);
  const [edited, setEdited] = useState(false);

  const actionSheetOptions = ['Compareceu', 'Não compareceu', 'Cancelar'];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => <HeaderBackButton {...props} label="Voltar" />,
      headerRight: () => <HeaderRightButtom />,
    });
  }, [navigation, edited]);

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarMode('dark');
      changeStatusBarBackground('#FFFFFF');
    }, [])
  );

  const handlePatientPress = () => {
    navigation.navigate('Patient', {
      patient: item.patient,
    });
  }

  const showActionSheet = () => {
    showActionSheetWithOptions({
      options: actionSheetOptions,
      cancelButtonIndex: 2,
      title: 'Selecione o status do agendamento',
    }, (index: number) => {

      if (index !== 2) {
        setSelectActionSheet(index);
        setEdited(true)
      } else {
        setSelectActionSheet('');
        setEdited(false)
      }
    });
  }

  async function handleSavePress() {
    if (edited) {
      const res = await api.put('/user/agendamentos/edit/', {
        id: item.id,
        status: actionSheetOptions[selectActionSheet],
      }).then(res => {
        navigation.navigate('Shedules', { date });
      })
    }
  }

  async function handleRemovePress() {
    const res = await api.delete(`/user/agendamentos/remove/${item.id}`)
      .then(res => {
        navigation.navigate('Shedules', { date });
      });
  }

  const HeaderRightButtom = () => {
    return (
      <TouchableOpacity
        disabled={!edited}
        onPress={handleSavePress}
        style={styles.saveContainer}
      >
        <Text style={[styles.saveText, !edited && { color: '#ccc' }]}>Save</Text>
      </TouchableOpacity>
    );
  }

  return (
    <React.Fragment>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Ionicons name='ios-calendar' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Data</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{moment(date).format('DD/MM/YYYY')}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Ionicons name='ios-timer' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Hora</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{moment(date).format('hh:mm A')}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.row}
            onPress={handlePatientPress}
          >
            <View style={styles.column}>
              <Fontisto name='heartbeat-alt' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Paciente</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{item.patient.nome}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL(`tel:5598912345678`)}
          >
            <View style={styles.column}>
              <Fontisto name='mobile-alt' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Celular</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{item.patient.celular}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => Linking.openURL(`whatsapp://send?phone=5598912345678`)}
          >
            <View style={styles.column}>
              <Fontisto name='whatsapp' size={18} style={styles.leftIcon} />
              <Text style={styles.text}>WhatsApp</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{item.patient.whatsapp}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={showActionSheet}
            style={styles.row}
          >
            <Text style={styles.text}>Status</Text>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 17 }}>{actionSheetOptions[selectActionSheet] ?? 'Selecione'}</Text>
                <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
              </View>
            </View>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeContainer}
            onPress={handleRemovePress}
          >
            <Ionicons name='md-trash' size={22} style={styles.leftIcon} color="#e53935" />
            <Text style={[styles.text, { color: '#e53935', fontSize: 20 }]}>Apagar agendamento</Text>
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

  disabled: {
    color: '#aaa'
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

  removeContainer: {
    flexDirection: 'row',
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

export default Shedule;