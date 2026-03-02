import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { CalendarPlus, ChevronRight, LogOut, UserPen } from "lucide-react-native";

import { useAuth } from "../contexts/auth/useAuth";
import EditProfileModal from "../components/EditProfileModal";
import ImagePicker from "../components/ImagePicker";
import CameraCapture from "../components/CameraCapture";
import { uploadProfileImage } from "../services/profileService";

export default function ProfileScreen() {
    const [imageUri, setImageUri] = useState(null);
    const { authState, logout } = useAuth();
    const [isEditFieldVisible, setIsEditFieldVisible] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!imageUri) return
        async function addProfileImage() {
            try {
                await uploadProfileImage(authState.user.id, imageUri);
            } catch (error) {
                setError(error.message);
            }
        }
        addProfileImage()
    }, [imageUri])

    return (
        <View style={styles.container}>
            {isEditFieldVisible && <EditProfileModal onClose={() => setIsEditFieldVisible(false)} userData={authState.user} />}
            <View style={styles.imageContainer}>
                <ImagePicker onImagePicked={setImageUri} imageUri={imageUri} profileImage={authState.user.profileImage} />
                <CameraCapture onPhotoTaken={setImageUri} />
            </View>
            <View style={styles.userSection}>
                <Text style={styles.username}>{authState.user.username}</Text>
                <Text style={styles.email}>{authState.user.email}</Text>
            </View>
            <View style={styles.optionsSection}>
                <TouchableOpacity onPress={() => setIsEditFieldVisible(true)}>
                    <View style={styles.optionContainer}>
                        <View style={styles.option}>
                            <UserPen color={styles.optionIcons.color} />
                            <Text style={styles.optionText}>Edit Profile</Text>
                        </View>
                        <ChevronRight color={styles.optionIcons.color} />
                    </View>
                </TouchableOpacity>
                <View style={styles.optionContainer}>
                    <View style={styles.option}>
                        <CalendarPlus color={styles.optionIcons.color} />
                        <Text style={styles.optionText}>Add today's weight</Text>
                    </View>
                    <ChevronRight color={styles.optionIcons.color} />
                </View>
                <TouchableOpacity style={styles.optionContainer} onPress={logout}>
                    <View style={styles.option}>
                        <LogOut color={'red'} />
                        <Text style={[styles.optionText, { color: 'red' }]}>Logout</Text>
                    </View>
                </TouchableOpacity>
                {error && <Text style={styles.errorMessage}>{error}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ebebeb",
        flex: 1,
        alignItems: "center",
    },
    imageContainer: {
        width: '100%'
    },
    placeholderText: {
        color: "#555",
        fontSize: 16,
        fontWeight: "600",
    },
    userSection: {
        gap: 20,
        alignItems: 'center',
        marginBottom: 50
    },
    username: {
        fontWeight: 'bold',
        fontSize: 23,
        color: '#3f3f3f'
    },
    email: {
        backgroundColor: '#9bdca5',
        paddingInline: 60,
        paddingBlock: 15,
        borderRadius: 10,
        color: '#026702',
        fontWeight: 500
    },
    optionsSection: {
        gap: 5,
        width: '90%'
    },
    optionContainer: {
        paddingInline: 20,
        paddingBlock: 13,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5
    },
    option: {
        flexDirection: 'row',
        gap: 10
    },
    optionText: {
        fontSize: 16,
        color: '#026702',
        fontWeight: 500
    },
    optionIcons: {
        color: '#026702',
    },
    errorMessage: {
        fontSize: 30, 
    }
})