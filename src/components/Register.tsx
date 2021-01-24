import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get('window');

interface RegisterProps {
    openModal: () => void
}

export default function Register({openModal}: RegisterProps) {
    return (
        <View style={[styles.createNewAccountContainer, styles.bottom]}>
            <View style={styles.orContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#BEBEBE' }}>────────</Text><Text> OR </Text><Text style={{ color: '#BEBEBE' }}>────────</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.createAccount}
                onPress={() => openModal()}>
                <Text style={styles.createAccountText}>Create New Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    createNewAccountContainer: {
        width,
    },
    orContainer: {
        alignItems: 'center',
    },
    createAccount: {
        backgroundColor: '#0669DD',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        height: 37.5,
        borderRadius: 5,
        marginHorizontal: 20,
    },
    createAccountText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        bottom: 15,
    },
});