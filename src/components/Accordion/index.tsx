import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager, Animated, Easing } from "react-native";
import { Colors } from './Colors';
import { AntDesign as Icon } from '@expo/vector-icons';

interface AccordianProps {
  navigation: any;
  title: string;
  data: {};
}

interface AccordianState {
  expanded: boolean;
  data: [];
}

export default class Accordian extends Component<AccordianProps, AccordianState> {

  constructor(props: any) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    }

    if (Platform.OS === 'android')
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  _renderItem() {
    return ({ item, index }: any) => (
      <View>
        <TouchableOpacity
          style={[styles.childRow, styles.button, item.value ? styles.btnActive : styles.btnInActive]}
          onPress={() => /**this.onClick(index) */ this.props.navigation.navigate('Shedule')}>
          <Text style={[styles.itemInActive]} >{item.key}</Text>

        </TouchableOpacity>
        <View style={styles.childHr} />
      </View>
    );
  }

  spinValue = new Animated.Value(0);

  render() {
    
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })

    return (
      <View>
        <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
          <Text style={[styles.title]}>{this.props.title}</Text>
          
          <Animated.View style={{transform: [{rotate: spin}] }}>
            {/*<Icon name={this.state.expanded ? 'up' : 'down'} size={20} color={Colors.DARKGRAY} />*/}
            <Icon name={'down'} size={20} color={Colors.DARKGRAY} />
          </Animated.View>
          
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {
          this.state.expanded &&
          <View style={{}}>
            <FlatList
              data={this.state.data}
              numColumns={1}
              scrollEnabled={false}
              renderItem={this._renderItem()}
            />
          </View>
        }

      </View>
    );
  }

  onClick = (index: any) => {
    const temp: any = this.state.data.slice()
    temp[index].value = !temp[index].value
    this.setState({ data: temp })
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded })

    Animated.timing(
      this.spinValue,
      {
        toValue: Number(!this.state.expanded),
        duration: 200,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true  // To make use of native driver for performance
      }
    ).start();
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.DARKGRAY,
  },
  itemActive: {
    fontSize: 12,
    color: Colors.GREEN,
  },
  itemInActive: {
    fontSize: 15,
    color: Colors.DARKGRAY,
  },
  btnActive: {
    borderColor: Colors.GREEN,
  },
  btnInActive: {
    borderColor: Colors.DARKGRAY,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    backgroundColor: Colors.CGRAY,
  },
  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.GRAY,
  },
  parentHr: {
    height: 1,
    color: Colors.WHITE,
    width: '100%'
  },
  childHr: {
    height: 1,
    backgroundColor: Colors.LIGHTGRAY,
    width: '100%',
  },
  colorActive: {
    borderColor: Colors.GREEN,
  },
  colorInActive: {
    borderColor: Colors.DARKGRAY,
  }

});
