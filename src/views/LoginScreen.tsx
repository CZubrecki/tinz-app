import React, { useState } from 'react';
import { Alert, Dimensions, KeyboardAvoidingView, Modal, StyleSheet, Text, View } from 'react-native';
import ForgotPassword from '../components/ForgotPassword';
import LoginForm from '../components/LoginForm';
import Register from '../components/Register';
import SignUpScreen from './SignUpScreen';

const { width } = Dimensions.get('window');

export default function LoginScreen(props: any) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const closeModal = () => setModalVisible(false);
    const openModal = () => setModalVisible(true);

    return(
        <>
            <Modal animationType="slide" collapsable={true} presentationStyle='formSheet' visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}>
                <SignUpScreen closeModal={closeModal} />
            </Modal>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Tinz</Text>
                </View>
                <LoginForm />
                <ForgotPassword />
                <Register openModal={openModal}/>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#A73C31',
        width,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        paddingTop: 20,
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
    }
})