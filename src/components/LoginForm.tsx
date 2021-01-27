import * as _ from 'lodash';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Theme } from '../theme';

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
                    placeholderTextColor={Theme.placeHolderTextColor}
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
                    placeholderTextColor={Theme.placeHolderTextColor}
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
        borderColor: Theme.lightGrey,
        width: (width * .90),
        marginHorizontal: 20,
        height: 75,
        borderWidth: 1,
        marginVertical: 20,
    },
    divider: {
        borderWidth: .5,
        borderColor: Theme.lightGrey,
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
        backgroundColor: Theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        height: 37.5,
        borderRadius: 5,
    },
    loginText: {
        fontWeight: '600',
        fontSize: 16,
        color: Theme.white,
    },
});