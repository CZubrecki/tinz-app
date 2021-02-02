import * as _ from 'lodash';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Camera from '../components/Camera';
import BottomBar from '../components/Camera/BottomBar';

const { height, width } = Dimensions.get('window');

export default function CameraScreen({navigation}: any) {
    const [imageUri, setImageUri] = useState<string | null>();
    const setPhoto = (uri: string | null) => {
        setImageUri(uri);
    }

    if(!_.isNil(imageUri)) {
        return (
            <>
                <View style={styles.container}>
                    <Image source={{uri: imageUri}} style={{width: (width * .90), height: (height * .50)}}/>
                </View>
                <BottomBar cancel={() => setPhoto(null)} setPhoto={setPhoto} usePhoto={() => console.log('useMe')} navigation={navigation} />
            </>
        );
    }

    return(
        <Camera setPhoto={setPhoto} navigation={navigation} />
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