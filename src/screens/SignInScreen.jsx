import { useState } from "react";
import { Image, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native";

import { useAuth } from "../contexts/auth/useAuth";

export default function SignInScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth()

    const signUpPressHandler = () => navigation.navigate('SignUp');

    const loginHandler = async () => {
        await login(email, password)

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.welcomeHeader}>
                    <Text style={styles.welcomeHeaderText}>Sign In</Text>
                </View>
                <View style={styles.inputSection}>
                    <TextInput placeholder='e-mail' value={email} keyboardType="email-address" onChangeText={setEmail} style={styles.inputs} />
                    <TextInput placeholder='password' value={password} secureTextEntry onChangeText={setPassword} style={styles.inputs} />
                </View>
                <View style={styles.anotherAccountSection}>
                    <Text style={{ fontSize: 20, color: '#4f4e4e', marginBottom: 20 }}>Sign in with another account</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f4f4f4',
        flex: 1,
        paddingTop: 50,
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
    }
})