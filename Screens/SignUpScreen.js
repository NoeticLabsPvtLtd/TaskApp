import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Inputetext } from '../Componant/InputText';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const signUp = async () => {
        setIsLoading(true)
        try {
            let status = await auth().createUserWithEmailAndPassword(email, password);
            console.log(status);
            Toast.show('Sign Up Successfull! Plese Sign in', Toast.LONG);
            if (status.user.uid != null) {
                navigation.navigate('Login')
            }
            setIsLoading(false)
            setEmail('')
            setPassword('')
           
        } catch (error) {
            // Alert.alert('Error', error.message);
            setIsLoading(false)
            setEmail('')
            setPassword('')
            Toast.show(error.message, Toast.LONG);
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
                                <TouchableOpacity style={{ height: 45, width: '40%', backgroundColor: "#26a1ab", alignSelf: 'center', marginTop: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => { signUp() }}>
                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Sign Up</Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={{ height: 60, width: '100%', position: 'absolute', bottom: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>Already have an account please</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                            <Text style={{ color: '#26a1ab' }}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})