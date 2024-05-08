import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Drawer } from 'react-native-drawer-layout'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Foundation from 'react-native-vector-icons/Foundation'

export default function UserHome({ navigation }) {

    const [visible, setvisible] = useState(false)
    const [disOpen, setDisOpen] = useState(false)
    const Logininfo = useSelector((state) => state.LoginInfo.LoginInfo)
    console.log(Logininfo);


    const renderDrawerContent = () => {
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
                <View style={{ height: '15%', width: '100%', backgroundColor: 'white' }}>
                    <View style={{ position: 'absolute', bottom: 10, left: 10, flexDirection: 'row' }}>
                        <EvilIcons name='user' size={60} style={{ marginBottom: 5 }} onPress={() => { setDisOpen(false), setvisible(true) }} />
                        <Text style={{ alignSelf: 'center', marginLeft: 10, fontSize: 20, fontWeight: '500', color: 'black' }}>{Logininfo.name}</Text>
                    </View>
                </View>
                <View style={{ height: '80%', width: '100%' }}>
                    <TouchableOpacity style={{ height: 40, width: '90%', backgroundColor: 'white', alignItems: 'center', borderRadius: 10, marginTop: 10, marginLeft: 5, flexDirection: "row", paddingLeft: '5%', elevation: 5 }} onPress={() => { }}>
                        <Entypo name='phone' style={{ fontSize: 18, fontWeight: '500', color: 'black' }} />
                        <Text style={{ fontSize: 18, fontWeight: '500', color: 'black', marginLeft: 5 }}>Contact us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 40, width: '90%', backgroundColor: 'white', alignItems: 'center', borderRadius: 10, marginTop: 10, marginLeft: 5, flexDirection: "row", paddingLeft: '5%', elevation: 5 }} onPress={() => { }}>
                        <Entypo name='info-with-circle' style={{ fontSize: 18, fontWeight: '500', color: 'black' }} />
                        <Text style={{ fontSize: 18, fontWeight: '500', color: 'black', marginLeft: 5 }}>About us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 40, width: '90%', backgroundColor: 'white', alignItems: 'center', borderRadius: 10, marginTop: 10, marginLeft: 5, flexDirection: "row", paddingLeft: '5%', elevation: 5 }} onPress={() => { }}>
                        <Entypo name='log-out' style={{ fontSize: 18, fontWeight: '500', color: 'black' }} />
                        <Text style={{ fontSize: 18, fontWeight: '500', color: 'black', marginLeft: 5 }}>logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{ height: 40, width: 50, justifyContent: 'center' }} onPress={() => setDisOpen(true)}>
                    <Foundation name='list-bullet' style={{ fontSize: 25, fontWeight: '500', color: 'black' }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <Drawer
            open={disOpen}
            renderDrawerContent={renderDrawerContent}
            onOpen={() => { setDisOpen(true) }}
            onClose={() => { setDisOpen(false) }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Welcome to SDLC Corp</Text>
            </View>
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setvisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.text}>{Logininfo.name}</Text>
                        <Text style={styles.label}>Age:</Text>
                        <Text style={styles.text}>{Logininfo.age}</Text>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.text}>{Logininfo.email}</Text>
                        <Text style={styles.label}>Mobile:</Text>
                        <Text style={styles.text}>{Logininfo.mobile}</Text>
                    </View>
                </View>
            </Modal>
        </Drawer>
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