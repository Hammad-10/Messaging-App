import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import Loader from '../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const handleLogin = () => {
    setVisible(true);
    firestore().collection('Users').where("Email", "==", email).get().then(res => {

      setVisible(false);

      if (res.docs != []) {
        console.log(JSON.stringify(res.docs[0].data()));
        gotoNext(res.docs[0].data().Name, res.docs[0].data().Email, res.docs[0].data().UserID)
      }

    }).catch(error => {
      setVisible(false);
      Alert.alert('User not found');
      console.log(error);
    })

  }

  const gotoNext = async (name, email, userId) => {

    await AsyncStorage.setItem("NAME", name);
    await AsyncStorage.setItem("EMAIL", email);
    await AsyncStorage.setItem("USERID",userId);

    props.navigation.navigate('MainScreen')

  }


  return (

    <View style={styles.container}>
      <Text style={styles.title}>
        Login

      </Text>


      <TextInput placeholder='Enter email' onChangeText={(value) => setEmail(value)} value={email} style={[styles.input, { marginTop: 60 }]} />

      <TextInput placeholder='Enter password' onChangeText={(value) => setPassword(value)} value={password} secureTextEntry={true} style={[styles.input, { marginTop: 20 }]} />


      <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
        <Text style={styles.btnText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.gotoSignup} onPress={() => props.navigation.navigate('Signup')} >
        <Text style={styles.newAcc}>
          create new account
        </Text>
      </TouchableOpacity>

      {/* <Loader visible={visible} /> */}
    </View>

  );




}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white'

  },
  title: {
    fontSize: 35,
    color: 'black',
    alignSelf: 'center',
    marginTop: 100,
    fontWeight: 'bold'

  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 40,
    paddingLeft: 10
  },
  btn: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 30
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  newAcc: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'black',
    marginTop: 5,

  }

});
