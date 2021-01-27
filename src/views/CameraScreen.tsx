import * as _ from 'lodash';
import React, { useState } from 'react';
import { Button, Dimensions, Image, StyleSheet, View } from 'react-native';
import { TakePictureResponse } from 'react-native-camera';
import Camera from '../components/Camera';

const {height, width} = Dimensions.get('window');

export default function CameraScreen() {
    const [image, setImage] = useState<TakePictureResponse | null>();
    const takePhoto = (image: TakePictureResponse) => {
        setImage(image);
    }

    if(!_.isNil(image)) {
        return (
            <View style={styles.container}>
                <Image source={{uri: image.uri}} style={{width: (width * .90), height: (height * .50)}}/>
                <Button title="Cancel" onPress={() => setImage(null)} />
            </View>
        );
    }

    return(
        <Camera takePhoto={takePhoto} />
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})