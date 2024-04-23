import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Settings
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



export default Setting = (props) => {

    const navigation = useNavigation();

  return (
    
      <View style = {styles.container}>
        <TouchableOpacity style = {styles.logoutbtn} onPress={()=>{
          navigation.navigate('Login')
        }}>
          <Text style = {{color:'white', fontSize:16}}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    
  );




}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    logoutbtn:{
      backgroundColor:'red',
      height:30,
      width:80,
      justifyContent:'center',
      alignItems:'center'
    }
 
});
