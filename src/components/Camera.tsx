import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import { Theme } from '../theme';

const PendingView = () => (
    <View style={{flex: 1}}>
      <ActivityIndicator />
    </View>
  );

interface CameraProps {
  takePhoto: (image: TakePictureResponse) => void;
}
  

export default function Camera({ takePhoto }: CameraProps){

    const takePicture = async (camera: RNCamera) => {
        const options = { quality: 0.5, base64: true };
        const image = await camera.takePictureAsync(options);
        takePhoto(image);
        // await processImage(image);
      };

    return(
        <View style={styles.container}>
            <RNCamera 
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                captureAudio={false}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}>
                {({ camera, status }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
                );
            }}
            </RNCamera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: Theme.white,
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });