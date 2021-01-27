import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Theme } from "../../theme";

const {width} = Dimensions.get("window");

interface NewPasswordEntryProps {
    forgotPasswordRequest: (emailParam?: string, verificationCodeParam?: string, newPasswordParam?: string) => void;
}

export default function NewPasswordEntry({ forgotPasswordRequest }: NewPasswordEntryProps) {
    const [newPasswordParam, setNewPassword] = useState<string>();
    const submitButton = async () => {
        if(newPasswordParam) {
            forgotPasswordRequest(undefined, undefined, newPasswordParam);
        }
    }

    return (
        <>
            <Text style={styles.title}>Enter your new password</Text>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='New Password'
                        placeholderTextColor={Theme.placeHolderTextColor}
                        clearButtonMode="always"
                        autoCapitalize="none"
                        style={styles.input}
                        onChangeText={text => setNewPassword(text)}
                        autoFocus={true}
                    />
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