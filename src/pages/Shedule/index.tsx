import React, { useState } from 'react';
import { StyleSheet, Text, Dimensions, View, LogBox, ScrollView } from "react-native";
import CalendarStrip from 'react-native-calendar-strip';


import { Ionicons } from '@expo/vector-icons';

import Accordian from '../../components/Accordion';
import { TouchableOpacity } from 'react-native-gesture-handler';


LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('window');

const markedDates = {
  '2020-11-16': { selected: true, marked: true, selectedColor: 'blue' },
  '2020-11-17': { marked: true },
  '2020-11-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
  '2020-11-19': { disabled: true, disableTouchEvent: true }
};

const Shedule = () => {
  const [menu, setMenu] = useState([{
    id: 1,
    title: 'Dr. Daniel Oliveira',
    data: [
      { key: '08:00 José Luiz Oliveira Barroso', value: false },
      { key: '08:30 Roberto Pereira dos Santos', value: false },
      { key: '09:00 Luiz Miranda Resende', value: false },
      { key: '09:30 Mariana Silveira dos Anjos', value: false },
    ]
  },
  {
    id: 2,
    title: 'Dra. Anna Sophia',
    data: [
      { key: '10:00 Adriano Byrne Azevedo', value: false },
      { key: '10:30 Maria Luiza Mendes', value: false },
      { key: '11:00 Pamela Amorin Gouveia', value: false },
      { key: '11:30 -- intervalo --', value: false }
    ]
  },
  {
    id: 3,
    title: 'Dr. David',
    data: [
      { key: '13:00 Bruna Garcia da Silva', value: false },
      { key: '13:30 Alexandre Moura Filho', value: false },
    ]
  },
  {
    id: 4,
    title: 'Dr. Wesley',
    data: [
      { key: 'Choco Lava Cake', value: false },
      { key: 'Gulabjamun', value: false },
      { key: 'Kalajamun', value: false },
      { key: 'Jalebi', value: false }
    ]
  }]);

  const renderAccordians = () => {
    const items = [];
    let item;
    for (item of menu) {
      items.push(
        <Accordian title={item.title} data={item.data} key={item.id} />
      );
    }
    return items;
  }

  return (
    <>
      <View style={styles.container}>
        <CalendarStrip
          scrollable
          
          style={{ height: 100, paddingTop: 20, paddingBottom: 10,
          }}
          calendarColor={'#3343CE'}
          calendarHeaderStyle={{ color: 'white', }}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          iconContainer={{ flex: 0.1  }}
        />

        <ScrollView style={{}}>
          {renderAccordians()}
        </ScrollView>

      </View>
      <View style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 5 }}>
        <TouchableOpacity style={{
          backgroundColor: 'blue',
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,

          elevation: 5,
        }}>
          <Ionicons name="ios-add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  }
})

export default Shedule;