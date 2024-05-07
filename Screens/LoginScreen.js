import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Inputetext } from '../Componant/InputText';

export default function Login({ navigation }) {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {

    }

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
                            value={Email}
                        />
                        <Inputetext
                            placeholder='Password'
                            onChange={(text) => setPassword(text)}
                            onChangeText={(text) => setPassword(text)}
                            value={Password}
                            secureTextEntry={true}
                        />
                        {
                            isLoading ?
                                <ActivityIndicator size={'large'} color={'#26a1ab'} />
                                :
                                <TouchableOpacity style={{ height: 45, width: '40%', backgroundColor: "#26a1ab", alignSelf: 'center', marginTop: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => { handleLogin() }}>
                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>LOGIN</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({})