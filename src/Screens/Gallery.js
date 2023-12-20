import { StyleSheet, Text, View, Animated, PanResponder, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const Gallery = ({ navigation }) => {
    const handleIconPress = () => {
        console.log('AnotherScreen');
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={handleIconPress} style={{ marginRight: 15 }}>
                    <Text>hii</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    return (
        <View>
            <Text>Your screen content goes here</Text>
        </View>
    )
}


export default Gallery;
const styles = StyleSheet.create({
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'bold',
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
});