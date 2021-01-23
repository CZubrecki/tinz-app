import React, { useContext, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen(props: any) {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const signIn = (email: string, password: string) => {
        login(email, password);
    }

    return(
        <View style={styles.container}>
            <Button title='Sign In' onPress={async() => signIn('c.m.zubrecki@gmail.com', 'Mnicz95!')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})