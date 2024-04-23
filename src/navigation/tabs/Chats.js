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
    FlatList,
    Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';

let id = ''

export default Chats = (props) => {



    const [users, setUsers] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        id = await AsyncStorage.getItem('USERID')

        let tempData = []
        const email = await AsyncStorage.getItem('EMAIL')

        firestore().collection('Users').where("Email", "!=", email).get().then(res => {
            if (res.docs != []) {
                res.docs.map(item => {
                    tempData.push(item.data());
                })
                setUsers(tempData);
            }

        })

    }



    return (

        <View style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.headerText}>
                    Messaging App
                </Text>

            </View>

            <FlatList
                data={users}
                renderItem={({ item, Index }) => {
                    return (
                        <TouchableOpacity style={styles.userItem} onPress={() => { navigation.navigate('Messages', { data: item, id: id }) }}>
                            <Icon name="user" size={25} color='black' style={{ marginTop: 15, marginLeft: 8 }} />
                            <Text style={styles.Name}>{item.Name}</Text>
                        </TouchableOpacity>
                    )

                }}

            />

        </View>

    );




}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    header: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    userItem: {
        width: Dimensions.get('window').width - 50,
        height: 60,
        marginTop: 20,
        alignSelf: 'center',
        borderWidth: 0.5,
        flexDirection: 'row',
        borderRadius: 10
    },
    Name: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginLeft: 15,
        marginTop: 17
    }


});
