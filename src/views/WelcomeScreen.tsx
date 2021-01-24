import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageLoader from '../components/ImageLoader';

export default function WelcomeScreen({ navigation }: any) {
    const [timePassed, setTimePassed] = useState<boolean>(false);
    setTimeout(() => {
        setTimePassed(true);
        if(timePassed){
            navigation.navigate('Login')
        }
    }, 600);

    return (
        <View style={styles.container}>
            <ImageLoader />
            <Text style={styles.title}>Welcome</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D3BE9B',
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
    },
})