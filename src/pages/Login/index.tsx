import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import axios from 'axios';
import { baseURL } from '../../services/api';

import { useAuth } from '../../contexts/auth';
import { useDropDown } from '../../contexts/dropDown';
import CustomStatusBar from '../../components/CustomStatusBar';

const Login = ({ navigation }: any) => {
  const { signIn } = useAuth();
  const { ref } = useDropDown();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForgotPass = () => {
    navigation.navigate('ForgotPass');
  }

  const handleLogin = async () => {
    if (email && password) {
      const res = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      }).then(async res => {
        await signIn(res.data);
      }).catch(err => {
        const msg =
          err.response &&
            err.response.data ?
            err.response.data
            :
            undefined;
        ref
          .current
          .alertWithType('error', "Erro!", msg.errors);
      })
    } else {
      ref
        .current
        .alertWithType('error', "Erro!", 'email ou senha vazios!');
    }
  }

  const handleSignup = () => {
    navigation.navigate('SignUp');
  }

  return (
    <React.Fragment>
      <CustomStatusBar background="#EF694D" mode="light" />
      <View style={styles.container}>
        <ScrollView>

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
              <Ionicons
                name="md-mail"
                size={25}
                color="#fff"
              />
              <TextInput
                value={email}
                onChangeText={setEmail}

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
              />
              <TextInput
                value={password}
                onChangeText={setPassword}

                secureTextEntry

                placeholder="Senha"
                style={styles.textinput}
                placeholderTextColor="#ffffffcf"
              />
            </View>

            <TouchableOpacity
              onPress={handleForgotPass}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              style={styles.loginButtomContainer}
            >
              <Text style={styles.loginButtomText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignup}
              style={styles.signUpButtomContainer}>
              <Text
                style={styles.signUpButtomText}
              >Não tem uma conta? <Text style={{ fontWeight: 'bold' }}> Cadastre-se!</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </React.Fragment>
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

export default Login;