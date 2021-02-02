import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Theme } from '../theme';
import BottomBar from './Camera/BottomBar';
import CameraOutlineOverlay from './Camera/CameraOutlineOverlay';

const PendingView = () => (
    <View style={{flex: 1}}>
      <ActivityIndicator />
    </View>
  );

interface CameraProps {
  setPhoto: (uri: string) => void;
  navigation: any;
  
}
  

export default function Camera({ setPhoto, navigation }: CameraProps){

    const takePicture = async (camera: RNCamera) => {
        const options = { quality: 0.5, base64: true };
        const image = await camera.takePictureAsync(options);
        setPhoto(image.uri);
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
                  <>
                    <CameraOutlineOverlay />
                    <BottomBar camera={camera} takePicture={takePicture}  navigation={navigation} setPhoto={setPhoto} />
                  </>
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