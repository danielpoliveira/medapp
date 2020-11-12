import React, { useState } from 'react';
import { StyleSheet, Text, Dimensions, View, LogBox, ScrollView, TouchableOpacity, Platform, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import CalendarStrip, { TDaySelectionAnimation } from 'react-native-calendar-strip';
import { Ionicons } from '@expo/vector-icons';

import moment from 'moment'

import Accordian from '../../components/Accordion';


LogBox.ignoreAllLogs();

/*const markedDates = {
  '2020-11-16': { selected: true, marked: true, selectedColor: 'blue' },
  '2020-11-17': { marked: true },
  '2020-11-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
  '2020-11-19': { disabled: true, disableTouchEvent: true }
};*/

const daySelectionAnimation = {
  type: 'background',
  duration: 300,
  highlightColor: '#FFF'
} as TDaySelectionAnimation;

const markedDates = [
  {
    date: '2020-11-22',
    dots: [
      {
        color: 'red',
        selectedColor: 'pink',
      },
    ],
  },
  {
    date: '2020-11-23',
    lines: [
      {
        color: 'orange',
        selectedColor: 'gray',
      },
    ],
  },
];

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

  const handleAddPressed = () => {
    navigation.navigate('NewShedule');
  }




  return (
    <>
      <View style={{ backgroundColor: '#3343CE', paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight }}>
        <ExpoStatusBar style="light" />
      </View>
      <View style={styles.container}>
        <CalendarStrip
          //iconLeft={() => {}}
          //iconRight={() => {}}
          //iconLeftStyle={{color: '#FFF'}}
          leftSelector={[]}
          rightSelector={[]}
          onDateSelected={() => { }}
          daySelectionAnimation={daySelectionAnimation}

          useNativeDriver={true}
          scrollable
          highlightDateNameStyle={{ color: '#000' }}
          highlightDateNumberStyle={{ color: '#000' }}

          style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarColor={'#3343CE'}
          calendarHeaderStyle={{ color: 'white', }}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          iconContainer={{ flex: 0.1 }}

        />

        <ScrollView style={{}}>
          {renderAccordians()}
        </ScrollView>

      </View>
      <View style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 5 }}>
        <TouchableOpacity style={styles.addShedule} onPress={handleAddPressed} >
          <Ionicons name="ios-add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    //paddingTop: 20,
    flex: 1,
  },

  addShedule: {
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
  }
})

export default Shedule;