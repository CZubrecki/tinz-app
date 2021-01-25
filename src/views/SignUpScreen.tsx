import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
const SmallIcon = require('../assets/smallIcon.png');

interface SignUpScreenProps {
    closeModal: () => void,
}

export default function SignUpScreen({ closeModal }: SignUpScreenProps) {
    const { signUp } = useContext(AuthContext);
    const { register, handleSubmit, setValue, getValues } = useForm();
    const onSubmit = async (data: any) => {
        if ((_.isNil(data.email) || _.isNil(data.password)) || (data.email.trim() === '' || data.password.trim() === '')) {
            Alert.alert('There are missing fields');
            return;
        }

        if (data.password.length < 8) {
            Alert.alert('Password must be 8 or more characters long');
            return;
        }
        
        signUp(data.email, data.password);
    }

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={SmallIcon} />
            </View>
            <View style={styles.form}>
                <TextInput
                    placeholder='Email'
                    placeholderTextColor="#BEBEBE"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={text => {
                        setValue('email', text);
                    }}
                />
                <View style={styles.divider} />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor="#BEBEBE"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={text => {
                        setValue('password', text);
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.signUpText}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.existingAccountContainer}>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.existingAccountText}>
                            Already have an account?
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#DBCBB0',
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        marginVertical: '7%',
        width: '90%',
        borderWidth: 1,
        borderColor: '#BEBEBE',
        borderRadius: 3,
        height: 75,
    },
    divider: {
        borderWidth: .5,
        borderColor: '#BEBEBE',
        height: 1,
    },
    input: {
        height: '50%',
        justifyContent: 'center',
        paddingHorizontal: '3%',
    },
    buttonContainer: {
        width: '90%',
    },
    signUpButton: {
        backgroundColor: '#A73C31',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 37.5,
        borderRadius: 5,
    },
    signUpText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFF',
    },
    existingAccountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%',
    },
    existingAccountText: {
        fontSize: 18,
    }
});