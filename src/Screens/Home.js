import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, FlatList, Image, Modal } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Drawer } from 'react-native-drawer-layout';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import PTRView from 'react-native-pull-to-refresh';
export default function Home({ navigation }) {
  const [open, setOpen] = React.useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [video, setVideo] = useState()
  const [videoModal, setVideoModal] = useState(false)

  const DrawerContent = () => {
    return (
      <View style={{ height: '100%', width: "100%" }}>
        <View style={{ height: '20%', width: '100%', backgroundColor: '#2b3643' }}>
          <View style={{ flex: 1, flexDirection: 'row', position: 'absolute', bottom: 10, left: 5 }}>
            <EvilIcons name='user' size={80} color={'#b4bcc8'} style={{}} />
            <View style={{ alignSelf: 'center', }}>
              <Text style={{ alignSelf: 'center', color: '#b4bcc8' }}>Hello,</Text>
              <Text style={{ alignSelf: 'center', color: '#b4bcc8', fontSize: 18, fontWeight: '600' }}>Admin</Text>
            </View>
          </View>
        </View>
        <View style={{ height: "80%", width: "100%", backgroundColor: '#2b3643', }}>
          <TouchableOpacity style={{ height: 40, width: '80%', backgroundColor: '#2b3643', alignItems: "center", borderRadius: 20, marginTop: 10, flexDirection: 'row', }} onPress={() => { setOpen(false) }}>
            <FontAwesome name='video-camera' color={'#b4bcc8'} size={20} style={{ marginLeft: 20 }} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: "#b4bcc8", marginLeft: 10 }}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ height: 40, width: '80%', backgroundColor: '#2b3643', alignItems: "center", borderRadius: 20, marginTop: 10, flexDirection: 'row', }} onPress={() => { setOpen(false), navigation.navigate('CameraScreen') }}>
            <Ionicons name='recording' color={'#b4bcc8'} size={20} style={{ marginLeft: 20 }} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: "#b4bcc8", marginLeft: 10 }}>Record Videos</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons name='list' size={30} style={{ color: '#666' }} onPress={() => { setOpen(true) }} />
      ),
    });
  }, [navigation]);
  

  const requestExternalStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        if (
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('External storage permissions granted');

        } else {
          console.log('External storage permissions denied');
        }
      } catch (error) {
        console.error('Error requesting external storage permissions:', error);
      }
    }
  };

  const renderVideos = ({ item }) => {
    return (
      <TouchableOpacity style={{ height: 200, width: '45%', margin: 10 }} onPress={() => { setVideo(item.path), setVideoModal(true) }}>
        <Image source={require('../img/1.jpeg')} style={{ height: '100%', width: '100%' }} />
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    requestExternalStoragePermission()
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    const cameraRollPath = RNFS.CachesDirectoryPath;
    const files = await RNFS.readDir(cameraRollPath);
    console.log(files);
    setVideoUri(files)
    const videoFile = files.find(file => file.name.endsWith('.mp4'));
    if (videoFile) {
      const videoPath = videoFile.path;
      console.log(videoPath);
    } else {
      console.log('No video file found in camera roll');
    }
  };

  const refresh = () => {
    fetchVideo()
  }

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={DrawerContent}
    >
      <View style={{ height: '100%', width: "100%" }}>

        <View style={{ height: '91%', width: '100%' }}>
          <PTRView onRefresh={() => {
            refresh()
          }} >
            <FlatList
              data={videoUri}
              renderItem={renderVideos}
              numColumns={2}
            />
          </PTRView>
        </View>
      </View>
      <Modal
        visible={videoModal}
        onRequestClose={() => { setVideoModal(false) }}
        style={{ height: '100%', width: "100%", justifyContent: "center", alignItems: "center" }}
      >
        <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Video
            source={{ uri: video }}
            controls={true}
            fullscreen={true}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      </Modal>
    </Drawer>
  )
}
