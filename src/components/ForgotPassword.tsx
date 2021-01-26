import * as _ from 'lodash';
import React, { useState } from 'react';
import { Alert, Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { resetPassword } from '../constants/AuthAPI';

const {width} = Dimensions.get("window");

export default function ForgotPassword() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>();
    const [newPassword, setNewPassword] = useState<string>();
    const [verificationCode, setVerificationCode] = useState<string>();
    const [verificationStep, setVerificationStep] = useState<boolean>(false);
    const [newPasswordStep, setNewPasswordStep] = useState<boolean>(false);

    const forgotPasswordRequest = () => {
        if(!_.isNil(newPassword) && !_.isNil(verificationCode) && !_.isNil(email)) {
            resetPassword({email, newPassword, verificationCode});
            setModalVisible(false);
        } else if(_.isNil(newPassword) && !_.isNil(verificationCode) && !_.isNil(email)) {
            setVerificationStep(false);
            setNewPasswordStep(true);
        } else if (!_.isNil(email)) {
            resetPassword({email});
            setVerificationStep(true);
        }
    }
    
    return(
        <>
            <Modal animationType="slide" collapsable={true} presentationStyle='formSheet' visible={modalVisible} onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}>
                <View style={styles.container}>
                    { newPasswordStep ? 
                        <>
                            <Text style={styles.title}>Enter your new password</Text>
                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='New Password'
                                        placeholderTextColor="#BEBEBE"
                                        clearButtonMode="always"
                                        autoCapitalize="none"
                                        style={styles.input}
                                        onChangeText={text => setNewPassword(text)}
                                        defaultValue={newPassword}
                                        autoFocus={true}
                                    />
                                </View>
                            </View>
                        </> 
                        : verificationStep ? 
                        <>
                            <Text style={styles.title}>Enter your Verification Code</Text>
                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='Verification Code'
                                        placeholderTextColor="#BEBEBE"
                                        clearButtonMode="always"
                                        autoCapitalize="none"
                                        keyboardType='numeric'
                                        style={styles.input}
                                        onChangeText={text => setVerificationCode(text)}
                                        defaultValue={verificationCode}
                                        autoFocus={true}
                                    />
                                </View>
                            </View>
                        </> :
                        <>
                            <Text style={styles.title}>Enter your Email</Text>
                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='Email'
                                        placeholderTextColor="#BEBEBE"
                                        clearButtonMode="always"
                                        autoCapitalize="none"
                                        keyboardType='email-address'
                                        style={styles.input}
                                        onChangeText={text => setEmail(text)}
                                        defaultValue={''}
                                        autoFocus={true}
                                    />
                                </View>
                            </View>
                    </>   
                    }
                    <TouchableOpacity
                                    style={styles.continueButton}
                                    onPress={forgotPasswordRequest}>
                                    <Text style={styles.continueText}>Continue</Text>
                    </TouchableOpacity>
                    <View style={styles.cancel}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.canelText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View> 
                </View>
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
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    form: {
        justifyContent: 'center',
        borderRadius: 3,
        borderColor: '#BEBEBE',
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
        backgroundColor: '#A73C31',
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
        color: '#FFF'
    },
    cancel: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    canelText: {
        fontSize: 18,
    }
});