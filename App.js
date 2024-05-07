import { LogBox, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavigationComponant from './Componant/NavigationComponant.'

export default function App() {
  LogBox.ignoreAllLogs()
  return (
    <NavigationComponant />
  )
}
