import { faCamera, faImages, faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import CameraRoll, { PhotoIdentifier } from '@react-native-community/cameraroll';
import React, { useState } from 'react';
import { Alert, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Theme } from '../../theme';
import CameraRollModal from './CameraRollModal';

const {width} =Dimensions.get('window');

interface BottomBarProps {
    camera?: RNCamera;
    takePicture?: (camera: RNCamera) => void;
    cancel?: () => void;
    usePhoto?: () => void;
    navigation: any;
}

export default function BottomBar({navigation, takePicture, camera, cancel, usePhoto}: BottomBarProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);

    const openPhotoLibrary = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
          })
          .then(r => {
            setPhotos(r.edges);
            setModalVisible(true);
          })
          .catch((err) => {
          });
    }

    return(
        <>
            <Modal animationType="slide" collapsable={true} presentationStyle='formSheet' visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}>
                <CameraRollModal photos={photos} />
            </Modal>
            <View style={styles.container}>
                <View style={styles.column}>
                    { takePicture && camera &&
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
                    <TouchableOpacity onPress={() => takePicture && camera ? openPhotoLibrary() : usePhoto}>
                        { takePicture && camera ?
                            <FontAwesomeIcon icon={faImages} size={ 26 } style={{color: Theme.white}} /> :
                            <Text style={styles.text}>Use</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </>
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