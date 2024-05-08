import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';

export default function AddEmployee({ navigation }) {

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('')
    const [aadress, setAddress] = useState('')
    const [mobile, setMobile] = useState('')

    useEffect(() => {
        const unsubscribe = firestore().collection('users').onSnapshot(snapshot => {
            if (snapshot && !snapshot.empty) { // Check if snapshot exists and has data
                const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(newData);
                console.log(newData);
            } else {
                setData([]); // Set data to an empty array if there is no data
            }
        });
        return () => unsubscribe();
    }, []);

    const addData = async () => {
        if (name === '' || age === '' || email === '' || aadress === '' || mobile === '') {
            Toast.show('Please fill the details', Toast.LONG)
        } else {
            try {
                await firestore().collection('users').add({
                    name,
                    age: parseInt(age), // Convert to number,
                    email,
                    aadress,
                    mobile
                });
                setName('')
                setAge('')
                setEmail('')
                setAddress('')
                setMobile('')
                Toast.show('Employee added successfully!', Toast.LONG)
            } catch (error) {
                Toast.show(error.message, Toast.LONG);
                console.log(error);
            }
        }

    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter name"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Age:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>aadress:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter address"
                    value={aadress}
                    onChangeText={setAddress}
                />
                <Text style={styles.label}>mobile:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter mobile"
                    value={mobile}
                    onChangeText={setMobile}
                    keyboardType="numeric"
                />
                <Button title="Add User" onPress={() => { addData() }} />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    modalContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: 0
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
})