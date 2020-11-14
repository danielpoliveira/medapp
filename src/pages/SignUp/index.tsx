import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useStatusBarMode } from '../../contexts/statusBarMode';
import { useFocusEffect } from '@react-navigation/native';

const SignUp = ({ navigation }: any) => {
  const { changeStatusBarMode, changeStatusBarBackground } = useStatusBarMode();

  useFocusEffect(
    React.useCallback(() => {
      changeStatusBarMode('light');
      changeStatusBarBackground('#EF694D');
    }, [])
  );

  const handleLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/07/medical-logo.jpg'
          }}
        />
      </View>

      <View style={{
        paddingHorizontal: 20,
      }}>

        <View style={styles.textInputContainer}>
          <MaterialIcons
            name="face"
            size={25}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Nome completo"
            placeholderTextColor="#ffffffcf"
          />
        </View>


        <View style={styles.textInputContainer}>
          <Ionicons
            name="md-mail"
            size={25}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Email"
            placeholderTextColor="#ffffffcf"
          />
        </View>

        <View style={styles.textInputContainer}>
          <Ionicons
            name="md-key"
            size={25}
            color="#fff"
            style={styles.icon}
          />
          <TextInput
            placeholder="Senha"
            style={styles.textinput}
            placeholderTextColor="#ffffffcf"
          />
        </View>

        <TouchableOpacity style={styles.loginButtomContainer}>
          <Text style={styles.loginButtomText}>Criar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          style={styles.signUpButtomContainer}>
          <Text
            style={styles.signUpButtomText}
          >Possui uma conta? <Text style={{ fontWeight: 'bold' }}> Conecte-se!</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EF694D',
  },

  logoContainer: {
    paddingTop: 50,
    paddingBottom: 40,
    alignItems: 'center'
  },

  logo: {
    height: 170,
    width: 170,
  },

  icon: {
    width: 25,
  },

  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFF',
  },

  textinput: {
    paddingHorizontal: 10,
    fontSize: 20,
    paddingVertical: 10,
  },

  forgotPasswordContainer: {
    alignItems: 'flex-end',
    paddingVertical: 10,
  },

  forgotPasswordText: {
    fontSize: 18,
    color: '#FFFFFFaf'
  },

  loginButtomContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },

  loginButtomText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EF694D',
  },

  signUpButtomContainer: {
    borderColor: '#ffffffcf',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signUpButtomText: {
    fontSize: 20,
    color: '#FFFFFF'
  },

});

export default SignUp;