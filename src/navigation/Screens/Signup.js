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
import uuid from 'react-native-uuid';



export default Signup = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSignup = ()=>{
        const userId = uuid.v4();
        firestore().collection('Users').doc(userId).set({
            Name:name,
            Email:email,
            Phone:phone,
            UserID: userId

        }).then(res=>{
            console.log('user created')
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
            props.navigation.navigate('Login')
        }).catch(error=>{
            console.log(error)
        });
    }



    return (

        <View style={styles.container}>
            <Text style={styles.title}>
                Signup

            </Text>

            <TextInput placeholder='Enter name' onChangeText={(value) => setName(value)} value={name} style={styles.input} />
            <TextInput placeholder='Enter email' onChangeText={(value) => setEmail(value)} value={email} style={[styles.input, { marginTop: 20 }]} />
            <TextInput placeholder='Enter phone' keyboardType='number-pad' onChangeText={(value) => setPhone(value)} value={phone} style={[styles.input, { marginTop: 20 }]} />
            <TextInput placeholder='Enter password' secureTextEntry={true} onChangeText={(value) => setPassword(value)} value={password} style={[styles.input, { marginTop: 20 }]} />
            <TextInput placeholder='Enter confirm password' secureTextEntry={true} onChangeText={(value) => setConfirmPassword(value)} value={confirmPassword} style={[styles.input, { marginTop: 20 }]} />

            <TouchableOpacity style={styles.btn} onPress={()=>handleSignup()}>
                <Text style={styles.btnText}>
                    Signup
                </Text>
            </TouchableOpacity>
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
    }

});
