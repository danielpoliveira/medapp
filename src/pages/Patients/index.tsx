import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet, StatusBar, TextInput, Platform } from "react-native";
import { StatusBar as ExpoStatusBar, } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  navigation: any;
}

const RenderPatients = (props: ItemProps) => {
  const { item, navigation } = props;
  return (
    <TouchableOpacity style={styles.renderContainer} onPress={() => navigation.navigate('Patient')}>
      <Text style={styles.renderText}>{item}</Text>
    </TouchableOpacity>
  );
}

const Patients = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(data);
  const [masterDataSource, setMasterDataSource] = useState(data);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = masterDataSource.filter(
        function (item: any) {
          const itemData = item
            ? item.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const clearFilter = () => {
    setSearch('');

    setFilteredDataSource(masterDataSource)
  }

  return (
    <>
      <ExpoStatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="ios-search" size={20} color="#3C3C4399" style={{ paddingRight: 5 }} />
            <TextInput
              value={search}
              onChangeText={(text) => searchFilterFunction(text)}
              placeholder="Pesquisar paciente"
              placeholderTextColor="#3C3C4399"
              style={{ fontSize: 18, }}
            />
          </View>
          {search ?
            <TouchableOpacity onPress={clearFilter} style={{ padding: 5, alignItems: 'center'}}>
              <Ionicons name="ios-close" size={32} color="#3C3C4399" />
            </TouchableOpacity>
            : undefined
          }
        </View>

        <FlatList 
          data={filteredDataSource}
          renderItem={(props: any) => <RenderPatients {...props} navigation={navigation} />} 
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight, flex: 1,
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

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#7676801F',
    width: '95%',
    //padding: 12.5,
    //paddingVertical: 10,
    height: 40,
    paddingHorizontal: 12.5,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,

  },

  search: {

  }
});

export default Patients;