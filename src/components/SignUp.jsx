import { useState } from "react";

import { Image, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";

export default function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.inputSection}>
                    <TextInput placeholder='username' value={username} onChangeText={setUsername} style={styles.inputs} />
                    <TextInput placeholder='e-mail' value={email} onChangeText={setEmail} style={styles.inputs} />
                    <TextInput placeholder='password' value={password} onChangeText={setPassword} style={styles.inputs} />
                    <TextInput placeholder='repeat-password' value={rePassword} onChangeText={setRePassword} style={styles.inputs} />
                </View>
                <View style={styles.anotherAccountSection}>
                    <Text style={{ fontSize: 20, color: '#4f4e4e', marginBottom: 20 }}>Sign up with another account</Text>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <TouchableOpacity>
                            <Image style={styles.anotherAccountImage} source={require('../../assets/google_logo.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.anotherAccountImage} source={require('../../assets/microsoft_logo.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.anotherAccountImage} source={require('../../assets/facebook_logo.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpButtonText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        flex: 1,
        paddingTop: 50,
        alignItems: 'center'
    },
    inputSection: {
        width: '100%',
        alignItems: 'center',
        gap: 20
    },
    inputs: {
        backgroundColor: 'white',
        width: '75%',
        height: 50,
        paddingLeft: 20,
        borderRadius: 20,
        shadowColor: '#575454',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.20,
        shadowRadius: 6,
        elevation: 10,
    },
    anotherAccountSection: {
        marginBlock: 40,
        alignItems: 'center',
    },
    anotherAccountImage: {
        height: 45,
        width: 45
    },
    buttons: {
        width: '75%'
    },
    signUpButton: {
        backgroundColor: '#42d309',
        paddingBlock: 13,
        borderRadius: 30,
    },
    signUpButtonText: {
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'
    },
})