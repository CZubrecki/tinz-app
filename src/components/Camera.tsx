import React from 'react';
import { RNCamera } from 'react-native-camera';

export default function Camera(){

    const takePicture = async (camera: RNCamera) => {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        console.log(data.uri);
      };

    return(
        <RNCamera 
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            captureAudio={false}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}>
            {/* {({ camera, status }) => {
                 
            }} */}
        </RNCamera>
    );
}