import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ForgotPassword() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    return(
        <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => setModalVisible(true)}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
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
});