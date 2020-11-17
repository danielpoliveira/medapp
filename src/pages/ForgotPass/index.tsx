import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar';

import { Ionicons, } from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth';

const ForgotPass = ({ navigation }: any) => {
  const { signIn } = useAuth();

  const [authKey, setAuthKey] = useState('');
  const [email, setEmail] = useState('');

  const [code, setCode] = useState(false);

  const handleLogin = () => {
    navigation.navigate('Login');
  }

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  }

  const handleForgot = async () => {
    setCode(true)
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

          <View style={{ paddingHorizontal: 20 }}>
            <View style={styles.textInputContainer}>
              <Ionicons
                name="md-mail"
                size={25}
                color="#fff"
                style={styles.icon}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.textinput}
                placeholder="Email"
                placeholderTextColor="#ffffffcf"
              />
            </View>
            {code &&
              (<View style={styles.textInputContainer}>
                <Ionicons
                  name="md-lock"
                  size={25}
                  color="#fff"
                  style={styles.icon}
                />
                <TextInput
                  value={authKey}
                  onChangeText={setAuthKey}
                  style={styles.textinput}
                  placeholder="Código de autenticação"
                  placeholderTextColor="#ffffffcf"
                />
              </View>
              )
            }

            <TouchableOpacity
              onPress={handleForgot}
              style={styles.loginButtomContainer}
            >
              <Text style={styles.loginButtomText}>Enviar link para o email</Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OU</Text>
              <View style={styles.orLine} />
            </View>

            <TouchableOpacity
              onPress={handleLogin}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Voltar ao login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSignUp}
              style={styles.signUpButtomContainer}>
              <Text
                style={styles.signUpButtomText}
              >Possui uma conta? <Text style={{ fontWeight: 'bold' }}> Conecte-se!</Text>
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
    alignItems: 'center',

    borderColor: '#ffffffcf',
    borderWidth: StyleSheet.hairlineWidth,
    //backgroundColor: '#78909c',

    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
  },

  forgotPasswordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',

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
    //borderColor: '#ffffffcf',
    //borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    //marginTop: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signUpButtomText: {
    fontSize: 20,
    color: '#FFFFFF'
  },

  orContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',

    marginVertical: 10,
    padding: 15,
  },

  orLine: {
    width: '35%',
    height: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#FFF',
  },
  orText: {
    fontSize: 18,
    marginHorizontal: 20,
    color: '#FFF'
  }

});



export default ForgotPass;