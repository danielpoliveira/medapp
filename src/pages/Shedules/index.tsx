import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, } from "react-native";
import CalendarStrip from 'react-native-calendar-strip';

import api from '../../services/api';

import { useFocusEffect } from '@react-navigation/native';
import { useStatusBarMode } from '../../contexts/statusBarMode';

import moment from 'moment';
import 'moment/locale/pt-br';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../components/Accordion/Colors';
import CheckIcon from '../../components/CheckIcon';
import Loader from '../../components/Loader';
import EmptyDateComponent from '../../components/EmptyDateComponent';

moment.locale();

const daySelectionAnimation = {
  type: 'background',
  duration: 350,
  highlightColor: '#FFFFFFCC'
} as TDaySelectionAnimation;

const RenderItem = ({ item, index, navigation }: any) => {
  const { patient } = item;

  return (
    <View>
      <TouchableOpacity
        style={[styles.childRow, styles.button,]}
        onPress={() => navigation.navigate('Shedule', {
          item
        })}
      >
        <View style={styles.childRow}>
          <Text style={[styles.itemInActive, { marginRight: 10 }]}>{moment(item.datetime).format('HH:MM A')}</Text>
          <Text style={[styles.itemInActive]}>{patient.nome}</Text>
        </View>

        <CheckIcon status={item.status} />
      </TouchableOpacity>
      <View style={styles.childHr} />
    </View>
  );
}

const Shedules = ({ navigation, route }: any) => {
  const { changeStatusBarMode, changeStatusBarBackground } = useStatusBarMode();
  const { date: _date } = route.params ?? { date: null }

  const [dataUsers, setDataUsers] = useState([]);
  const [date, setDate] = useState(_date || moment());
  const [loading, setLoading] = useState(true);

  const handleDatePress = (date: Date | any) => {
    setLoading(true);

    setDate(moment(date));

    loadData(date);
  }

  async function loadData(_date = undefined) {
    const auxDate = _date ?? date;

    await api.get('/user/agendamentos/all/', {
      params: {
        data: moment(auxDate).format('YYYY-MM-DD'),
      },
    }).then(res => {
      setDataUsers(res.data);

      setLoading(false);
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarMode('light');
      changeStatusBarBackground('#EF694D');

      loadData();
    }, [date])
  );

  const handleAddPressed = () => {
    navigation.navigate('NewShedule');
  }

  const markedDatesArray = [{
    date,
    dots: [{
      color: '#FFF',
      selectedColor: '#333',
    }],
  }];


  return (
    <React.Fragment>
      <Loader loading={loading} />
      <View style={styles.container}>
        <CalendarStrip
          daySelectionAnimation={daySelectionAnimation}

          markedDates={markedDatesArray}
          leftSelector={[]}
          rightSelector={[]}
          onDateSelected={handleDatePress}
          useNativeDriver={true}
          scrollable
          highlightDateNameStyle={{ color: '#333' }}
          highlightDateNumberStyle={{ color: '#333' }}
          style={styles.calendaStripStyle}
          calendarColor="#EF694D"
          calendarHeaderStyle={styles.calendaHeaderStyle}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          iconContainer={{ flex: 0.025 }}
        />

        <FlatList
          keyExtractor={(props: any) => props.id.toString()}
          data={dataUsers}
          renderItem={props => <RenderItem {...props} navigation={navigation} />}
          contentContainerStyle={
            !dataUsers.length && styles.containerEmptyView
          }
          ListEmptyComponent={<EmptyDateComponent date={date} />}
        />
      </View>

      <View style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 5 }}>
        <TouchableOpacity style={styles.addShedule} onPress={handleAddPressed} >
          <Ionicons name="ios-add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.GRAY,
  },

  itemInActive: {
    fontSize: 15,
    color: Colors.DARKGRAY,
  },

  button: {
    width: '100%',
    height: 54,
    //backgroundColor: 'red',
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },

  addShedule: {
    backgroundColor: '#EF694D',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: "#555",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 5,
  },

  calendaHeaderStyle: {
    color: 'white',
    textTransform: 'capitalize',
  },

  calendaStripStyle: {
    height: 130,
    paddingTop: 20,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 10,
  },

  childHr: {
    height: 1,
    backgroundColor: Colors.LIGHTGRAY,
    width: '100%',
  },

  containerEmptyView: {
    justifyContent: 'center', alignItems: 'center', height: '100%'
  }
})

export default Shedules;