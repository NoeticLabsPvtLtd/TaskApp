import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Inputetext } from '../Componant/InputText';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    const signIn = async () => {
        setIsLoading(true)
        console.log(email, password);
        try {
            var status = await auth().signInWithEmailAndPassword(email, password);
            if (status.user.uid != null) {
                Toast.show('Login Successfull', Toast.LONG);
                navigation.navigate('HomeScreen')
            }
            setIsLoading(false)
            setEmail('')
            setPassword('')

        } catch (error) {
            console.log(error);
            Toast.show(error.message, Toast.LONG);
        }
    };

    const resetPassword = async () => {
        try {
            let status = await auth().sendPasswordResetEmail(email);
            console.log(status);
            Alert.alert('Success', 'Password reset email sent');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#364150' }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
            <View style={{ flex: 1, backgroundColor: '#364150' }}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ height: '35%', width: '80%', alignSelf: 'center', marginTop: '25%', backgroundColor: '#eceef1', borderRadius: 10 }}>
                        <Text style={{ fontSize: 28, fontWeight: '400', color: '#4db3a5', alignSelf: 'center', marginTop: 20 }}>Sign In</Text>
                        <Inputetext
                            placeholder='Email'
                            onChange={(text) => setEmail(text)}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <Inputetext
                            placeholder='Password'
                            onChange={(text) => setPassword(text)}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry={true}
                        />
                        {
                            isLoading ?
                                <ActivityIndicator size={'large'} color={'#26a1ab'} />
                                :
                                <TouchableOpacity style={{ height: 45, width: '40%', backgroundColor: "#26a1ab", alignSelf: 'center', marginTop: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => { signIn() }}>
                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>LOGIN</Text>
                                </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={() => resetPassword()}>
                            <Text style={{ alignSelf: 'center', marginTop: 5 }}>Forgot password</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 60, width: '100%', position: 'absolute', bottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Don't have an account please</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }}>
                            <Text style={{ color: '#26a1ab' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})