import { useState } from "react";
import { Image, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

import { Eye, EyeOff } from "lucide-react-native";

import { useAuth } from "../contexts/auth/useAuth";
import ErrorText from "./ErrorText";

export default function SignUp() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const { register, authError } = useAuth();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const [signUpError, setSignUpError] = useState('');

    const registerPressHandler = async () => {
        try {
            if (username.length <= 2) {
                throw new Error('Username is too short');
            }

            if (!emailValidator.test(email)) {
                throw new Error('Invalid email');
            }

            if (!passwordValidator.test(password)) {
                throw new Error('Password must be at least 6 characters long and include at least uppercase letter, lowercase letter, number, and one special character');
            }

            if (password !== rePassword) {
                throw new Error('Password missmatched');
            }

            const result = await register(email, password, username)
            if (result === undefined) { throw new Error('A user with this email already exists') }
        } catch (error) {
            setSignUpError(error.message);
            setTimeout(() => setSignUpError(''), 4000);
        }

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
                        {signUpError && <ErrorText errorMessage={signUpError} />}
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
    buttons: {
        width: '75%',
        marginTop: 50
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