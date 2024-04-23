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

import AsyncStorage from '@react-native-async-storage/async-storage';



export default Splash = (props) => {

    useEffect(()=>{
        setTimeout(()=>{
            checkLogin();
        }, 2000)

    }, [])


    const checkLogin = async ()=>{
        const id = await AsyncStorage.getItem('USERID');

        if(id !== null){
            props.navigation.navigate('MainScreen');
        }
        else{
            props.navigation.navigate('Login');
        }

    }


  return (
    
      <View style = {styles.container}>
        <Text style = {styles.maintext}>
            Messaging App
        </Text>
      </View>
    
  );




}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    maintext:{
        fontSize:25,
        color:'black',

    }
 
});
