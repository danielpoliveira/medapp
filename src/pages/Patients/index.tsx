import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, } from "react-native";
import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import { useStatusBarMode } from '../../contexts/statusBarMode';
import ListSelector from '../../components/ListSelector';

const data = [
  'Pooja Mills',
  'Lacie-Mae Milner',
  'Rosa Fuller',
  'Otis Bannister',
  'Fabio Foley',
  'Breanna Britt',
  'Cassia Chavez',
  'Reema Mcgee',
  'Jack Battle',
  'Daniel Oliveira',
  'Zakariyya Marks',
  'Danni Holman',
  'Patricia Chamberlain',
  'Arjun Redfern',
  'Khalid Aldred',
  'Edna Penn',
  'Wasim Woolley',
  'Kornelia Jimenez',
  'Hasnain Sierra',
  'Alivia Kirk',
  'Isa Sloan',
  'Paul Cherry',
  'Dillan Fraser',
  'Reanne Bain',
  'Giacomo Ferguson',
  'Jaxson Cobb',
  'Olivier Lindsay',
  'Kloe Johnson',
  'Anna Sophia',
  'Malachy Bonner',
  'Daniyal Peel',
  'Edward Lees',
  'Jobe Dillard',
  'Humaira Ford',
  'Amelia-Mae Rosa',
  'Blaine Peterson',
  'Bree Herrera',
  'Jazmyn Fritz',
  'Lena Wharton',
  'Corinne Vega',
  'Juniper Adamson',
  'Rhodri Sweeney',
  'Wesley sousa',
  'Blade Yates',
  'Lyndon Lim',
  'Hakim Bass',
  'Aneesha Dunlap',
  'Chelsey Singh',
  'Keavy Crossley',
  'Collette Hebert',
  'Rafe Riley',
  'Clistenys Eduardo',
  'Astrid Wu',
  'Adele Whittington',
  'Kaydee Rosario',
  'Joann Padilla',
  'Mattie Berry',
  'Danielius Huffman',
  'Glen Hodge',
  'Aron Medrano',
  'Miruna Gonzalez',
  'Ulisses Natan',
  'Clare Simpson',
  'Yusef Ventura',
  'Emyr Major',
  'Vivian Guest',
  'Maya Ballard',
  'Maureen Ratliff',
  'Asia Glenn',
  'Franklyn Eastwood',
  'Penelope Sandoval',
  'Pedro Lucas',
  'Grant Wickens',
  'Libby Beasley',
  'Richard Deleon',
  'Ishaaq Vazquez',
  'Sachin Howell',
  'Meg Cummings',
  'Alessia Roach',
  'Daniel Ribeiro',
  'Arwen French',
  'Jackson Merritt',
  'Yisroel Hobbs',
  'Evie-May Price',
  'Kwame Seymour',
  'Lexi Ridley',
  'Sarah-Louise Jacobson',
  'Connagh Ritter',
  'Callam Hayes',
  'Sofija Salinas',
  'Cherish Dorsey',
  'Saara Burks',
  'Cloe Vaughan',
  'Ebrahim Aguilar',
  'Autumn Juarez',
  'Esther Frederick',
  'Jasmin Love',
  'Alys Edge',
  'Emrys Rhodes',
  'Braiden Avalos',
  'Gerard Rossi',
  'Chyna Hartman',
  'Dilara Moore',
  'Amirah Bowler',
  'Britney Weston',
  'Robbie Mackenzie',
  'Shamas Alvarez',
];

const Patients = ({ navigation }: any) => {
  const { changeStatusBarMode, changeStatusBarBackground } = useStatusBarMode();

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarMode('dark');
      changeStatusBarBackground('#FFFFFF');
    }, [])
  );

  return (
    <React.Fragment>

      <View style={styles.container}>
        <ListSelector mode="page" data={data} navigation={navigation} />
      </View>

      <View style={[styles.addContainer]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NewPatient')}
          style={styles.buttom}
        >
          <Octicons name="diff-added" size={22.5} color="#FFFFFF" />
          <Text style={{ fontSize: 20, color: '#FFFFFF', marginLeft: 10 }}>Novo paciente</Text>
        </TouchableOpacity>
      </View>


    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  renderContainer: {
    paddingVertical: 20,
    marginHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa'
  },

  renderText: {
    fontSize: 16,
  },



  addContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttom: {
    backgroundColor: '#EF694D',
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,

    shadowColor: "#555",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 5,
  },

  search: {

  }
});

export default Patients;