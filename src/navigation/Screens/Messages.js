import React, { useState, useEffect, useCallback } from 'react';
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
import { GiftedChat } from 'react-native-gifted-chat'
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';



export default Messages = (props) => {

  const [messageList, setMessageList] = useState([])

  const route = useRoute();

  useEffect(() => {
    const subscriber = firestore()
      .collection("chats")
      .doc(route.params.id + route.params.data.UserID)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querysnapshot => {
        const allmsgs = querysnapshot.docs.map(item => {
          return { ...item._data, createdAt: item._data.createdAt }
        });
        setMessageList(allmsgs);
      });

    // Return a function to unsubscribe from the snapshot listener
    return () => subscriber(); // Call the returned function to unsubscribe
  }, []);

  const onSend = useCallback(async (messages = []) => {
    try {
      const msg = messages[0];

      const myMsg = {
        ...msg,
        sendBy: route.params.id,
        sendTo: route.params.data.UserID,
        createdAt: Date.parse(msg.createdAt)
      };

      console.log('w',route.params.id)
      console.log('z',route.params.UserID)

      setMessageList(previousMessages =>
        GiftedChat.append(previousMessages, myMsg)
      );

      await Promise.all([
        firestore()
          .collection('chats')
          .doc(`${route.params.id}${route.params.data.UserID}`)
          .collection('messages')
          .add(myMsg),
        firestore()
          .collection('chats')
          .doc(`${route.params.data.UserID}${route.params.id}`)
          .collection('messages')
          .add(myMsg)
      ]);

      console.log('3');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, []);


  return (

    <View style={styles.container}>
      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>

  );




}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },


});
