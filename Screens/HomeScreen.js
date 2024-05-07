import { Button, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('')
  const [aadress, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [visible, setvisible] = useState(false)
  const [clickedData, setClickedData] = useState([{ "aadress": "", "age": 0, "email": "", "id": "", "mobile": "", "name": "" }])
  const [updateModal, setUpdateModal] = useState(false)
  const [userId, setUserId] = useState()

  // const Logininfo = useSelector((state) => state)

  useEffect(() => {
    const unsubscribe = firestore().collection('users').onSnapshot(snapshot => {
      if (snapshot && !snapshot.empty) { // Check if snapshot exists and has data
        const newData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(newData);
        console.log(newData);
      } else {
        setData([]); // Set data to an empty array if there is no data
      }
    });
    return () => unsubscribe();
  }, []);

  const addData = async () => {
    if (name === '' || age === '' || email === '' || aadress === '' || mobile === '') {
      Toast.show('Please fill the details', Toast.LONG)
    } else {
      try {
        await firestore().collection('users').add({
          name,
          age: parseInt(age), // Convert to number,
          email,
          aadress,
          mobile
        });
      } catch (error) {
        Toast.show(error.message, Toast.LONG);
        console.log(error);
      }
    }

  };

  const deleteData = async (id) => {
    try {
      await firestore().collection('users').doc(id).delete();
      Toast.show('Success Data deleted successfully', Toast.LONG);
    } catch (error) {
      Toast.show(error.message, Toast.LONG);
    }
  };

  const handleUpdate = async () => {
    try {
      await firestore().collection('users').doc(userId).update({
        name,
        age: parseInt(age),
        email,
        mobile,
        aadress,
      });
      setUpdateModal(false)
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const renderusers = ({ item }) => {
    return (
      <TouchableOpacity style={{ width: '100%', backgroundColor: "lightgrey", marginTop: 10, padding: 5, borderRadius: 10, elevation: 5, marginBottom: 10, paddingLeft: 10 }} onPress={() => { console.log(item); setClickedData(item), setvisible(true) }}>
        <Text>{item.name}</Text>
        <Text>{item.email}</Text>
        <TouchableOpacity style={{ position: "absolute", right: 10, top: '40%' }} onPress={() => { deleteData(item.id) }}>
          <AntDesign name='delete' color={'red'} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: "absolute", right: 34, top: '40%' }} onPress={() => { setName(item.name), setAge(item.age), setEmail(item.email), setAddress(item.aadress), setMobile(item.mobile), setUserId(item.id), setUpdateModal(true) }}>
          <AntDesign name='edit' color={'green'} size={20} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          // value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          // value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Text style={styles.label}>email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          // value={name}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>aadress:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          // value={age}
          onChangeText={setAddress}
        />
        <Text style={styles.label}>mobile:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter mobile"
          // value={age}
          onChangeText={setMobile}
          keyboardType="numeric"
        />
        <Button title="Add User" onPress={() => { addData() }} />
        <View>
          <FlatList
            data={data}
            renderItem={renderusers}
          />
        </View>
      </ScrollView>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setvisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{clickedData.name}</Text>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.text}>{clickedData.age}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{clickedData.email}</Text>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.text}>{clickedData.mobile}</Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.text}>{clickedData.aadress}</Text>
          </View>
        </View>
      </Modal>
      <Modal
        visible={updateModal}
        animationType='slide'
        onRequestClose={() => setUpdateModal(false)}
      >
        <View style={{ height: '8%', elevation: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: "center" }}>
          <TouchableOpacity style={{
            height: 40, width: 50, position: 'absolute', left: 0, justifyContent: 'center', alignItems: 'center'
          }} onPress={() => setUpdateModal(false)}>
            <MaterialIcons name='arrow-back' size={25} color={'black'} />
          </TouchableOpacity>
          <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>Update Details</Text>
        </View>
        <ScrollView style={styles.container}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <Text style={styles.label}>email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>aadress:</Text>
          <TextInput
            style={styles.input}
            value={aadress}
            onChangeText={setAddress}
          />
          <Text style={styles.label}>mobile:</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="numeric"
          />
          <Button title="Update User" onPress={() => { handleUpdate() }} />
        </ScrollView>

      </Modal>
    </View>
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