import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Platform, StatusBar } from "react-native";
import CalendarStrip from 'react-native-calendar-strip';
import { Ionicons } from '@expo/vector-icons';

import Accordian from '../../components/Accordion';
import { useFocusEffect } from '@react-navigation/native';
import { useStatusBarMode } from '../../contexts/statusBarMode';

import 'moment/locale/pt-br';

const daySelectionAnimation = {
  type: 'background',
  duration: 350,
  highlightColor: '#FFFFFFCC'
} as TDaySelectionAnimation;

const data = [{
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
}];

const Shedule = ({ navigation }: any) => {
  const { changeStatusBarMode, changeStatusBarBackground } = useStatusBarMode();
  const [menu, setMenu] = useState(data);

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarMode('light');
      changeStatusBarBackground('#EF694D');
    }, [])
  );

  const renderAccordians = () => {
    const items = [];
    let item;
    for (item of menu) {
      items.push(
        <Accordian title={item.title} data={item.data} key={item.id} navigation={navigation} />
      );
    }
    return items;
  }

  const handleAddPressed = () => {}

  return (
    <React.Fragment>
      <View style={styles.container}>
        <CalendarStrip
          daySelectionAnimation={daySelectionAnimation}
          leftSelector={[]}
          rightSelector={[]}
          onDateSelected={() => { }}
          useNativeDriver={true}
          scrollable
          highlightDateNameStyle={{ color: '#333' }}
          highlightDateNumberStyle={{ color: '#333' }}
          style={{ height: 130, paddingTop: 20, paddingBottom: 10 }}
          calendarColor="#EF694D"

          calendarHeaderStyle={{ color: 'white', textTransform: 'capitalize'}}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          iconContainer={{ flex: 0.035 }}
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
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
})

export default Shedule;