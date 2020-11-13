import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Platform, Alert, Modal, TouchableWithoutFeedback, } from 'react-native';

import { Ionicons, AntDesign } from '@expo/vector-icons';

interface ListSelectorProps {
  mode: 'page' | 'selector',
  data: any,
  navigation?: any;
  visible?: boolean;
  setVisible?: (prop: boolean) => void;
}

const RenderItem = (props: ItemProps) => {
  const { item, navigation } = props;

  return (
    <TouchableOpacity style={styles.renderContainer} onPress={() => navigation.navigate('Patient')}>
      <Text style={styles.renderText}>{item}</Text>
    </TouchableOpacity>
  );
}

const SearchContainer = ({ data, navigation }: any) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(data);
  const [masterDataSource, setMasterDataSource] = useState(data);

  const clearFilter = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource)
  }

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData: any = masterDataSource.filter(
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
        data={filteredDataSource}
        renderItem={(props: any) => <RenderItem {...props} navigation={navigation} />}
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

const ListSelector = ({ mode, data, navigation, visible, setVisible }: ListSelectorProps) => {
  return (
    mode === 'selector'
      ?
      <CustomModal visible={visible} visibleModal={setVisible} navigation={navigation}>
        <View style={{ /*paddingTop: Platform.OS === 'ios' ? 20 : 0, */ }}>
          <SearchContainer data={data} navigation={navigation} />
        </View>
      </CustomModal>
      :
      <SearchContainer data={data} navigation={navigation} />
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