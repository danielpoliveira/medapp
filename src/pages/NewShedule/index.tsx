import React, { useRef, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Switch, TouchableOpacityBase, Modal } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import ActionSheet from 'react-native-actionsheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';



const actionSheetOptions = ['Compareceu', 'Não compareceu', 'Cancelar'];

const NewShedule = ({ navigation }: any) => {
  const refActionSheet = useRef(null) as any;

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [selectActionSheet, setSelectActionSheet] = useState<number | string>('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightButtom />
    });
  }, [navigation]);

  const HeaderRightButtom = () => (
    <TouchableOpacity onPress={() => { }} style={styles.saveContainer}>
      <Text style={styles.saveText}>Save</Text>
    </TouchableOpacity>
  );

  const PlatformDateTimeComponent = ({ children }: any) => {
    return Platform.OS === 'ios'
      ?
      <Modal visible={true} transparent animationType={'fade'}>
        <View style={{ flex: 1, backgroundColor: '#00000050', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ borderRadius: 12.5, width: '90%', backgroundColor: '#FFF', overflow: 'hidden' }}>
            <View
              style={styles.datetimePickerOptions}
            >
              <TouchableOpacity onPress={() => setShow(false)}>
                <Text style={{ fontSize: 19, color: '#f20000' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShow(false)}>
                <Text style={{ fontSize: 19, color: 'blue' }}>Ok</Text>
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </View>
      </Modal>
      :
      children;
  }

  const DateTimePickerComponent = ({ date, mode, onChange }: any) => {
    return (
      <PlatformDateTimeComponent>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      </PlatformDateTimeComponent>
    )
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    //setShow(Platform.OS === 'ios');
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
    if (buttonIndex < actionSheetOptions.length - 1)
      setSelectActionSheet(buttonIndex);
  }

  const showActionSheet = () => {
    if (refActionSheet.current) {
      refActionSheet.current.show();
    }
  }

  return (
    <>
      <ExpoStatusBar style="dark" />

      {show && 
        <DateTimePickerComponent date={date} mode={mode} onChange={onChange} />
      }
      
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>Data</Text>
          <TouchableOpacity onPress={showDatepicker} >
            <Text style={styles.text}>{moment.utc(date).format('DD/MM/YYYY')}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={styles.row}
        >
          <Text style={styles.text}>Hora</Text>
          <TouchableOpacity onPress={showTimepicker} >
            <Text style={styles.text}>{moment.utc(date).format('hh:mm A')}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={styles.row}
        >
          <Text style={styles.text}>Paciente</Text>
          <Text style={styles.text}>Maria Luiza Mendes</Text>
        </View>

        <View
          style={styles.row}
        >
          <Text style={styles.text}>Telefone</Text>
          <Text style={styles.text}>(21) 1234-5678</Text>
        </View>

        <View
          style={styles.row}
        >
          <Text style={styles.text}>Celular</Text>
          <Text style={styles.text}>(21) 1234-5678</Text>
        </View>


        <View
          style={styles.row}
        >
          <Text style={styles.text}>Status</Text>
          <View>
            <TouchableOpacity onPress={showActionSheet}>
              <Text style={{ fontSize: 17 }}>{actionSheetOptions[selectActionSheet] ?? 'Selecione'}</Text>
            </TouchableOpacity>
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

        </View>

        <View style={styles.row}>
          <Text style={[styles.text, { color: '#F20000' }]}>Apagar agendamento</Text>
        </View>
      </View>
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
  }


});


export default NewShedule;