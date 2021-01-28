import { faCamera, faImages, faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Theme } from '../../theme';

const {width} =Dimensions.get('window');

interface BottomBarProps {
    camera?: RNCamera;
    takePicture?: (camera: RNCamera) => void;
    cancel?: () => void;
    usePhoto?: () => void;
}

export default function BottomBar({takePicture, camera, cancel, usePhoto}: BottomBarProps) {
    return(
        <View style={styles.container}>
            <View style={styles.column}>
                { takePicture && camera &&
                    <TouchableOpacity onPress={() => console.log('Cancel')}>
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.column}>
                <TouchableOpacity onPress={() => takePicture && camera ? takePicture(camera) : cancel()} style={styles.capture}>
                    <FontAwesomeIcon icon={takePicture && camera ? faCamera : faRedo } size={ 30 } style={{color: Theme.primary}} />
                </TouchableOpacity>
            </View>
            <View style={styles.column}>
                <TouchableOpacity onPress={() => takePicture && camera ? console.log('Image Library') : usePhoto}>
                    { takePicture && camera ?
                        <FontAwesomeIcon icon={faImages} size={ 26 } style={{color: Theme.white}} /> :
                        <Text style={styles.text}>Use</Text>
                    }
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.primary,
        width,
        height: 175,
        paddingBottom: 45,
    },
    column: {
        flexDirection: 'column',
        width: (width/3),
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: Theme.white,
    },
    capture: {
        backgroundColor: Theme.white,
        borderRadius: 37.5,
        width: 75,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
});