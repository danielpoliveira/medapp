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
  ScrollView,
  Linking,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Ionicons, Fontisto } from '@expo/vector-icons';

import moment from 'moment';

import ActionSheet from 'react-native-actionsheet';

import { useStatusBarMode } from '../../contexts/statusBarMode';

const actionSheetOptions = ['Compareceu', 'Não compareceu', 'Cancelar'];

const Shedule = ({ navigation }: any) => {
  const refActionSheet = useRef(null) as any;

  const [date, setDate] = useState(new Date(Date.now()));
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
            onPress={() => navigation.navigate('Patient')}
          >
            <View style={styles.column}>
              <Fontisto name='heartbeat-alt' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Paciente</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>Maria Luiza</Text>
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
              <Text style={styles.text}>(21) 1234-5678</Text>
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
              <Text style={styles.text}>(21) 1234-5678</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={showActionSheet} style={styles.row}>
            <Text style={styles.text}>Status</Text>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 17 }}>{actionSheetOptions[selectActionSheet] ?? 'Selecione'}</Text>
                <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
              </View>
              <ActionSheet
                ref={refActionSheet}
                title={'Selecione o status do agendamento'}
                options={actionSheetOptions}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                tintColor={'#555'}
                onPress={handleActionSheetPress}
              />
            </View>

          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Text style={[styles.text, { color: '#F20000' }]}>Apagar agendamento</Text>
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

export default Shedule;