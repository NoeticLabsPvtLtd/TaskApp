import { LogBox, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import NavigationComponant from './Componant/NavigationComponant.'
import firestore from '@react-native-firebase/firestore';
export default function App() {
  LogBox.ignoreAllLogs()

  useEffect(() => {
    if(__DEV__ && Platform.OS === 'android') {
      firestore().useEmulator('10.0.2.2', 8080)
    }
  }, []);

  return (
    <NavigationComponant />
  )
}
