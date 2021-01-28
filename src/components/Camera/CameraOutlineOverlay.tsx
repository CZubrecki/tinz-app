import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Theme } from '../../theme';

const { height, width } = Dimensions.get('window');

export default function CameraOutlineOverlay() {
    return (
        <View style={styles.container}>
            <View style={styles.outline}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outline: {
        borderColor: Theme.white,
        borderWidth: 1,
        width: (width * .90),
        height: (height * .60),
        opacity: 0.25,
        borderRadius: 15,
    }

});