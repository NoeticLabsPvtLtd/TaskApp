import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import AdminHome from '../Screens/AdminHome';
import AddEmployee from '../Screens/AddEmployee';
import UserHome from '../Screens/UserHome';

export default function NavigationComponant() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name='UserHome' component={UserHome} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="AdminHome" component={AdminHome} options={{ title: 'Dashboard' }} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ title: 'Add User' }} />
        <Stack.Screen name='AddEmployee' component={AddEmployee} options={{ title: 'Add Employee' }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})