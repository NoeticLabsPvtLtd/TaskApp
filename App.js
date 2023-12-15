import { LogBox, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationComp from './src/Componant/NavigationComp'

export default function App() {
  LogBox.ignoreAllLogs()
  return (
    <NavigationComp/>
  )
}

const styles = StyleSheet.create({})