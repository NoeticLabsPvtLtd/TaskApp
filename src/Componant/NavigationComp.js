import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import CameraScreen from '../Screens/CameraScreen';
import Gallery from '../Screens/Gallery';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();

export default function NavigationComp() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name='Gallery' component={Gallery} options={{ title: 'Gallery', headerTitleAlign: 'center' }} /> */}
                <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerTitleAlign: 'center' }} />
                <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

