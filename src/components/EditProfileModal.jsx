import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    Keyboard
} from "react-native";

import { X, Eye, EyeOff } from "lucide-react-native";

import { useState } from "react";

export default function EditProfileModal({ onClose, userData }) {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newRePassword, setNewRePassword] = useState('');

    console.log(newUsername, newEmail, newPassword, newRePassword);


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.overlay}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.editFieldContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Edit Profile</Text>
                        <TouchableOpacity onPress={onClose}>
                            <X size={28} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View>
                            <Text style={styles.label}>Username</Text>
                            <TextInput defaultValue={userData.username} onChangeText={setNewUsername} style={styles.inputField} />
                        </View>
                        <View>
                            <Text style={styles.label}>Email</Text>
                            <TextInput defaultValue={userData.email} onChangeText={setNewEmail} style={styles.inputField} />
                        </View>
                        <View>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput onChangeText={setNewPassword} secureTextEntry={!passwordVisible} style={styles.inputField} />
                            {passwordVisible ? <Eye onPress={() => setPasswordVisible(false)} style={styles.showPassword} /> : <EyeOff onPress={() => setPasswordVisible(true)} style={styles.showPassword} />}
                        </View>
                        <View>
                            <Text style={styles.label}>Re Password</Text>
                            <TextInput onChangeText={setNewRePassword} secureTextEntry={!passwordVisible} style={styles.inputField} />
                            {passwordVisible ? <Eye onPress={() => setPasswordVisible(false)} style={styles.showPassword} /> : <EyeOff onPress={() => setPasswordVisible(true)} style={styles.showPassword} />}
                        </View>
                    </View>
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.updateButton}><Text>Update</Text></TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 20,
        zIndex: 1,
        justifyContent: 'center'
    },
    editFieldContainer: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        color: "#222",
    },
    content: {
        paddingVertical: 10,
        gap: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#4f4e4e',
        fontSize: 17,
        marginBottom: 5,
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#858484',
        borderRadius: 10,
        padding: 17
    },
    submitContainer: {
        marginTop: 30,
        alignItems: 'center'
    },
    updateButton: {
        backgroundColor: '#2ec61a',
        paddingInline: 30,
        paddingBlock: 15,
        borderRadius: 15
    },
    showPassword: {
        position: 'absolute',
        right: 15,
        top: 44,
    }
});