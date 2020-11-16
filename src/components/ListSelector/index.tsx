import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

interface ListSelectorProps {
  mode: 'page' | 'selector',
  data: any,
  navigation?: any;
  visible?: boolean;
  setSelect?: (value: {}) => void;
  setVisible?: (prop: boolean) => void;
}

const RenderItem = (props: any) => {
  const { item, mode, setSelect, navigation } = props;

  function handleNavigationPatient() {
    if(mode === 'page') {
      navigation.navigate('Patient', {
        patient: item,
      });
    } else {
      setSelect(item);
    }
  }

  return (
    <TouchableOpacity
      style={styles.renderContainer}
      onPress={handleNavigationPatient}
    >
      <Text style={styles.renderText}>{item.nome}</Text>
    </TouchableOpacity>
  );
}

const SearchContainer = ({ data, mode, setSelect, navigation }: any) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setFilteredDataSource(data);
    }, [data])
  );

  const clearFilter = () => {
    setSearch('');
    setFilteredDataSource(data)
  }

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData: any = data.filter(
        function (item: any) {
          const itemData = item
            ? item.nome.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });

      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="ios-search" size={20} color="#3C3C4399" style={{ paddingRight: 5 }} />
          <TextInput
            value={search}
            onChangeText={(text) => searchFilterFunction(text)}
            placeholder="Pesquisar"
            placeholderTextColor="#3C3C4399"
            style={{ fontSize: 18, }}
          />
        </View>
        {search ?
          <TouchableOpacity onPress={clearFilter} style={{ padding: 5, alignItems: 'center' }}>
            <Ionicons name="ios-close" size={32} color="#3C3C4399" />
          </TouchableOpacity>
          : undefined
        }
      </View>

      <FlatList
        keyExtractor={(item: any) => item.id.toString()}
        data={filteredDataSource}
        renderItem={(props: any) => <RenderItem setSelect={setSelect} {...props} mode={mode} navigation={navigation} />}
      />

    </View>
  );
}

const CustomModal = ({ children, visible, visibleModal, navigation }: any) => {
  const closeModal = () => {
    visibleModal(false);
  }

  return (
    <Modal
      presentationStyle="pageSheet"
      onRequestClose={closeModal}
      animationType={'slide'}
      visible={visible}
    >
      <TouchableOpacity
        onPress={closeModal}
        style={styles.modalHeaderContainer}
      >
        <AntDesign name="down" size={22.5} />
        <Text style={styles.modalHeaderText}>Selecione</Text>
        <View style={{ width: 22.5 }} />
      </TouchableOpacity>
      {children}
    </Modal>
  );
}

const ListSelector = ({ mode, data, navigation, visible, setVisible, setSelect }: ListSelectorProps) => {
  return (
    mode === 'selector'
      ?
      <CustomModal visible={visible} visibleModal={setVisible} navigation={navigation}>
        <View style={{ flex: 1 }}>
          <SearchContainer 
            data={data} 
            navigation={navigation} 
            mode={'selector'} 
            setSelect={setSelect} 
          />
        </View>
      </CustomModal>
      :
      <SearchContainer data={data} navigation={navigation} mode={'page'} />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  modalHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },

  modalHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#7676801F',
    width: '95%',
    height: 40,
    paddingHorizontal: 12.5,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
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
});

export default ListSelector;