import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import {
  
} from 'react-native';
import Splash from './Screens/Splash';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import MainScreen from './Screens/MainScreen';
import Chats from './tabs/Chats';
import Setting from './tabs/Setting';
import Messages from './Screens/Messages';


const Stack = createNativeStackNavigator();


export default App = () => {


  return (
    
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='MainScreen' component={MainScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Chats' component={Chats} />
            <Stack.Screen name='Setting' component={Setting} />
            <Stack.Screen name='Messages' component={Messages} />
            

        </Stack.Navigator>
    </NavigationContainer>
    
  );




}

