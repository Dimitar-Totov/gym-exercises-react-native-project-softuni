import { useState } from "react";
import { Image, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";

import { Eye, EyeOff } from "lucide-react-native";

import { useAuth } from "../contexts/auth/useAuth";
import ErrorText from "../components/ErrorText";

export default function SignInScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth()
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [loginError, setLoginError] = useState('');

    const signUpPressHandler = () => navigation.navigate('SignUp');

    const loginHandler = async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error('Invalid email');
            }

            if (!password) {
                throw new Error('Password cannot be empty');
            }

            const result = await login(email, password)
            if (result === undefined) { throw new Error('Invalid email or password') }
        } catch (error) {
            setLoginError(error.message);
            setTimeout(() => setLoginError(''), 4000);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.content} >
                    <View style={styles.welcomeHeader}>
                        <Text style={styles.welcomeHeaderText}>Sign In</Text>
                    </View>
                    <View style={styles.inputSection}>
                        <TextInput placeholder='e-mail' value={email} keyboardType="email-address" onChangeText={setEmail} style={styles.inputs} />
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <TextInput placeholder='password' value={password} secureTextEntry={!passwordVisible} onChangeText={setPassword} style={styles.inputs} />
                            {passwordVisible ? <Eye style={styles.showPasswordButton} onPress={() => setPasswordVisible(false)} hitSlop={10} /> : <EyeOff style={styles.showPasswordButton} onPress={() => setPasswordVisible(true)} hitSlop={10} />}
                        </View>
                        {loginError && <ErrorText errorMessage={loginError} />}
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.signInButton} onPress={loginHandler}>
                            <Text style={styles.signInButtonText}>Sign in</Text>
                        </TouchableOpacity>
                        <View style={styles.signUpSection}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={signUpPressHandler} hitSlop={5}>
                                <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
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
    welcomeHeader: {
        marginBlock: 50,
    },
    welcomeHeaderText: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#22b508',
        fontFamily: 'serif'
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
        marginTop: 50,
    },
    signInButton: {
        backgroundColor: '#42d309',
        paddingBlock: 13,
        borderRadius: 30,
    },
    signInButtonText: {
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'
    },
    signUpSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    showPasswordButton: {
        position: 'absolute',
        top: 14,
        right: 70
    }
})