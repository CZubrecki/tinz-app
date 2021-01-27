import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Theme } from '../../theme';

const {width} = Dimensions.get("window");

interface VerificationCodeProps {
    forgotPasswordRequest: (emailParam?: string, verificationCodeParam?: string, newPasswordParam?: string) => void;
}

export default function VerificationCodeEntry({ forgotPasswordRequest }: VerificationCodeProps) {
    const [verificationCodeParam, setVerificationCode] = useState<string>();
    const submitButton = async () => {
        if(verificationCodeParam) {
            forgotPasswordRequest(undefined, verificationCodeParam, undefined);
        }
    }

    return(
        <>
            <Text style={styles.title}>Enter your Verification Code</Text>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Verification Code'
                        placeholderTextColor={Theme.placeHolderTextColor}
                        clearButtonMode="always"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        style={styles.input}
                        onChangeText={text => setVerificationCode(text)}
                        autoFocus={true} />
                </View>
            </View>
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => submitButton()}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    form: {
        justifyContent: 'center',
        borderRadius: 3,
        borderColor: Theme.lightGrey,
        width: (width * .90),
        marginHorizontal: 20,
        height: 50,
        borderWidth: 1,
        marginVertical: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
    },
    inputContainer: {
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    input: {
        justifyContent: 'center',
    },
    continueButton: {
        backgroundColor: Theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        height: 37.5,
        width: (width * .90),
        borderRadius: 5,
    },
    continueText: {
        fontWeight: '600',
        fontSize: 16,
        color: Theme.white,
    },
});