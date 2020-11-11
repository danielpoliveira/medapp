import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput } from "react-native";

import { Ionicons } from '@expo/vector-icons';

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

interface ItemProps {
  item: string;
}

const RenderPatients = (props: ItemProps) => {
  const { item } = props;
  return (
    <View style={styles.renderContainer}>
      <Text style={styles.renderText}>{item}</Text>
    </View>
  );
}

const Patients = () => {
  return (
    <View style={{ paddingTop: 20 }}>
      <View style={styles.searchContainer}>
        <Ionicons name="ios-search" size={22.5} color="#3C3C4399"/>
        {/**<Text style={styles.search}>Pesquisar pacientes</Text> */}
        <TextInput placeholder="Pesquisar paciente" placeholderTextColor="#3C3C4399" style={{fontSize: 18, marginLeft: 5}}/>
      </View>

      <FlatList data={data} renderItem={(props: any) => <RenderPatients {...props} />} />
    </View>
  )
}


const styles = StyleSheet.create({
  renderContainer: {
    padding: 10,
  },

  renderText: {

  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#7676801F',
    width: '95%',
    padding: 12.5,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  search: {

  }
});

export default Patients;