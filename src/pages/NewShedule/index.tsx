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

import { HeaderBackButton } from '@react-navigation/stack';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import moment from 'moment';

import ActionSheet from 'react-native-actionsheet';
import DateTimePicker from '@react-native-community/datetimepicker';

const actionSheetOptions = ['Compareceu', 'Não compareceu', 'Cancelar'];

const NewShedule = ({ navigation }: any) => {
  const refActionSheet = useRef(null) as any;

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState<IOSMode>('date');
  const [show, setShow] = useState(false);
  const [selectActionSheet, setSelectActionSheet] = useState<number>('' as any);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props: any) => <HeaderBackButton {...props} label="Início" />,
      headerRight: () => <HeaderRightButtom />,
    });
  }, [navigation]);

  const HeaderRightButtom = () => (
    <TouchableOpacity onPress={() => { }} style={styles.saveContainer}>
      <Text style={styles.saveText}>Save</Text>
    </TouchableOpacity>
  );

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
    if (buttonIndex < actionSheetOptions.length-1)
      setSelectActionSheet(buttonIndex);
  }

  const showActionSheet = () => {
    if (refActionSheet.current)
      refActionSheet.current.show();
  }

  return (
    <>
      <ExpoStatusBar style="dark" />

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
                  //is24Hour={true}
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
          //  is24Hour={true}
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
              <Text style={styles.text}>{moment(date).format('DD/MM/YYYY')}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={showTimepicker} style={styles.row}>
            <View style={styles.column}>
              <Ionicons name='ios-timer' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Hora</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>{moment(date).format('hh:mm A')}</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.column}>
              <Ionicons name='ios-medkit' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Paciente</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>Maria Luiza</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.column}>
              <Ionicons name='ios-call' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Telefone</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>(21) 1234-5678</Text>
              <Ionicons name='ios-arrow-forward' size={20} style={styles.rightIcon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={styles.column}>
              <Ionicons name='ios-phone-portrait' size={20} style={styles.leftIcon} />
              <Text style={styles.text}>Celular</Text>
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
    </>
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