import * as _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const {width} = Dimensions.get("window");

export default function LoginForm() {
    const { login } = useContext(AuthContext);
    const { register, handleSubmit, setValue, getValues } = useForm();
    const onSubmit = async (data: any) => {
        if ((_.isNil(data.email) || _.isNil(data.password)) || (data.email.trim() === '' || data.password.trim() === '')) {
            Alert.alert('Password or email is missing');
            return;
        }
        await login(data.email, data.password);
    }
    
    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    return(
        <View style={styles.form}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    placeholderTextColor="#BEBEBE"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    keyboardType='email-address'
                    style={styles.input}
                    onChangeText={text => {
                        setValue('email', text);
                    }}
                />
            </View>
            <View style={styles.divider} />
            <View style={styles.inputContainer}>
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
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        borderRadius: 3,
        borderColor: '#BEBEBE',
        width: (width * .90),
        marginHorizontal: 20,
        height: 75,
        borderWidth: 1,
        marginVertical: 20,
    },
    divider: {
        borderWidth: .5,
        borderColor: '#BEBEBE',
        height: 1,
    },
    inputContainer: {
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    input: {
        height: '50%',
        justifyContent: 'center',
    },
    loginButton: {
        backgroundColor: '#A73C31',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        height: 37.5,
        borderRadius: 5,
    },
    loginText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFF'
    },
});