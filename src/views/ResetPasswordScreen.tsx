import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

export default function ResetPasswordScreen(){
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <Modal animationType="slide" collapsable={true} presentationStyle='formSheet' visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}>
                <ForgotPasswordModal closeModal={() => setModalVisible(!modalVisible)}  />
            </Modal>
            <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => setModalVisible(true)}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    forgotPassword: {
        marginVertical: 35,
    },
    forgotPasswordText: {
        fontWeight: '600',
        fontSize: 16,
    },
})