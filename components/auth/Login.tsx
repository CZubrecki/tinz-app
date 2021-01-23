import React, { useContext, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { AuthContext } from './AuthContext';

export default function Login(){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>(''); 
    const { signIn } = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <TextInput placeholder="Email" onChangeText={text => setEmail(text)}/>
            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={text => setPassword(text)} />
            <Button title='Sign In' onPress={() => signIn({ email, password })} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
})