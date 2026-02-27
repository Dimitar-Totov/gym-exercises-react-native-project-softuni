import { useState } from "react";

import { Image, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "../contexts/auth/useAuth";

import { Eye, EyeOff } from "lucide-react-native";

export default function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const { register, authError } = useAuth();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const registerPressHandler = async () => {
        await register(email, password, username)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.content}>
                    <View style={styles.inputSection}>
                        <TextInput placeholder='username' value={username} onChangeText={setUsername} style={styles.inputs} />
                        <TextInput placeholder='e-mail' value={email} keyboardType="email-address" onChangeText={setEmail} style={styles.inputs} />
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TextInput placeholder='password' value={password} secureTextEntry={!passwordVisible} onChangeText={setPassword} style={styles.inputs} />
                            {passwordVisible ? <Eye style={styles.showPasswordButton} onPress={() => setPasswordVisible(false)} /> : <EyeOff style={styles.showPasswordButton} onPress={() => setPasswordVisible(true)} />}
                        </View>
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TextInput placeholder='repeat-password' value={rePassword} secureTextEntry={!passwordVisible} onChangeText={setRePassword} style={styles.inputs} />
                            {passwordVisible ? <Eye style={styles.showPasswordButton} onPress={() => setPasswordVisible(false)} /> : <EyeOff style={styles.showPasswordButton} onPress={() => setPasswordVisible(true)} />}
                        </View>
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
                        <TouchableOpacity style={styles.signUpButton} onPress={registerPressHandler}>
                            <Text style={styles.signUpButtonText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        flex: 1,
        paddingTop: 50,
        alignItems: 'center'
    },
    content: {
        width: '100%',
        alignItems: 'center'
    },
    inputSection: {
        width: '100%',
        alignItems: 'center',
        gap: 20
    },
    inputs: {
        paddingRight: 50,
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
    showPasswordButton: {
        position: 'absolute',
        top: 15,
        right: 70,
    }
})