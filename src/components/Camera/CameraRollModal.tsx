import { PhotoIdentifier } from "@react-native-community/cameraroll";
import React from 'react';
import { Image, ScrollView, View } from 'react-native';

interface CameraRollModalProps {
    photos: PhotoIdentifier[],
}

export default function CameraRollModal({ photos }: CameraRollModalProps) {
    return(
        <View>
            <ScrollView>
            {photos.map((p, i) => {
            return (
                <Image
                key={i}
                style={{
                    width: 300,
                    height: 100,
                }}
                source={{ uri: p.node.image.uri }}
                />
            );
            })}
            </ScrollView>
        </View>
    );
}