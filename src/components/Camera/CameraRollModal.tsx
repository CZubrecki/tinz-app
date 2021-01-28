import { PhotoIdentifier } from "@react-native-community/cameraroll";
import React from 'react';
import { Button, Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface CameraRollModalProps {
    photos: PhotoIdentifier[],
    closeModal: () => void,
}

export default function CameraRollModal({ photos, closeModal }: CameraRollModalProps) {
    return(
            <>
                <View style={styles.header}>
                    <Button title="Cancel" onPress={closeModal}/>
                </View>
                <ScrollView contentContainerStyle={styles.container}>
                {photos.map((p, i) => {
                return (
                    <View style={styles.imageContainer} key={i}>
                        <Image
                        style={styles.imagePreview}
                        source={{ uri: p.node.image.uri }}
                        />
                    </View>
                );
                })}
                </ScrollView>
            </>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 10,
    },
    cancelButton: {
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imageContainer: {
        width: (width/3),
        height: 100,
    },
    imagePreview: {
        margin: 1,
        width: '99%',
        height: '99%',
    } 
});