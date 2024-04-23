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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Chats from '../tabs/Chats';
import Setting from '../tabs/Setting';


export default MainScreen = (props) => {

  const [iconColor, setIconColor] = useState(0);


  return (

    <View style={styles.container}>

      {iconColor == 0 ? <Chats /> : <Setting />}

      <View style={styles.bottomtab}>
        <TouchableOpacity onPress={() => setIconColor(0)}>
          <MaterialCommunityIcons name="chat" size={30} color={iconColor == 0 ? 'white' : 'grey'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIconColor(1)}>
          <AntDesign name="setting" size={30} color={iconColor == 1 ? 'white' : 'grey'} />
        </TouchableOpacity>



      </View>

    </View>

  );




}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bottomtab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'

  }


});
