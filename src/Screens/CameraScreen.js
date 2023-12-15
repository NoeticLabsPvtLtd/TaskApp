import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RNFS from 'react-native-fs';
export default function CameraScreen({ navigation }) {
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [playpausebtn, setplaypausebtn] = useState(true)
    const [start, setStart] = useState(false)
    const camera = useRef(null)
    const [timer, setTimer] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const cameraDevice = isFrontCamera ? useCameraDevice('front') : useCameraDevice('back');

    useEffect(() => {
        CheckPermission()
    }, [])


    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    const toggleTimer = () => {
        setIsActive((prevIsActive) => !prevIsActive);
    };

    const resetTimer = () => {
        setSeconds(0);
        setIsActive(false);
    };

    const CheckPermission = async () => {
        const newCameraPermission = await Camera.requestCameraPermission()
        const newMicrophonePermission = await Camera.requestMicrophonePermission()
    }
    if (cameraDevice == null) return <ActivityIndicator />

    const RecordVideo = async () => {
        const Video =
            await camera.current.startRecording({
                onRecordingFinished: async (video) => {
                    const path = video.path
                    await CameraRoll.save(`${RNFS.DownloadDirectoryPath}+${path}`, {
                        type: 'video'
                    })

                },
                onRecordingError: (error) => console.error(error)
            })
    }

    const StopRecord = async () => {
        await camera.current.stopRecording()
    }

    const PauseRecording = async () => {
        await camera.current.pauseRecording()
    }

    const PlayRecording = async () => {
        await camera.current.resumeRecording()
    }

    return (
        <View style={{ height: '100%', width: "100%", }}>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={cameraDevice}
                isActive={true}
                video={true}
                audio={true}
            />
            {!start ? <>
                <TouchableOpacity
                    style={{ height: 60, width: 60, backgroundColor: '#bd2f32', position: "absolute", bottom: 20, alignSelf: "center", borderRadius: 100 }}
                    onPress={() => { RecordVideo(), setStart(!start), toggleTimer() }}
                />
            </>
                : <>
                    <MaterialIcons name='pause-circle' color={'red'} style={{ position: "absolute", bottom: 20, alignSelf: "center" }} size={65} onPress={() => { StopRecord(), setStart(!start), resetTimer() }} />
                    <Text style={{ position: "absolute", bottom: 10, alignSelf: "center", }}>{seconds}</Text>
                </>
            }
            <TouchableOpacity style={{ height: 60, width: 60, backgroundColor: 'lightgrey', position: "absolute", bottom: 20, left: '5%', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => { setplaypausebtn(!playpausebtn) }} >
                {!playpausebtn ?
                    <AntDesign name='pause' size={30} onPress={() => { PauseRecording() }} />
                    :
                    <AntDesign name='play' size={30} onPress={() => { PlayRecording() }} />
                }
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 60, width: 60, backgroundColor: 'lightgrey', position: "absolute", bottom: 20, right: '5%', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => { setIsFrontCamera(!isFrontCamera) }} >
                <MaterialIcons name='flip-camera-android' size={30} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})