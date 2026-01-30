import { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

import { CalendarPlus, ChevronRight, LogOut, Settings, UserPen } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Permission required to access photos.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.imageWrapper} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                    <Text style={styles.placeholderText}>Upload Photo</Text>
                )}
            </Pressable>
            <View style={styles.userSection}>
                <Text style={styles.username}>Example Username</Text>
                <Text style={styles.email}>example@email.com</Text>
            </View>
            <View style={styles.optionsSection}>
                <View style={styles.optionContainer}>
                    <View style={styles.option}>
                        <UserPen color={styles.optionIcons.color} />
                        <Text style={styles.optionText}>Edit Profile</Text>
                    </View>
                    <ChevronRight color={styles.optionIcons.color} />
                </View>
                <View style={styles.optionContainer}>
                    <View style={styles.option}>
                        <Settings color={styles.optionIcons.color} />
                        <Text style={styles.optionText}>Settings</Text>
                    </View>
                    <ChevronRight color={styles.optionIcons.color} />
                </View>
                <View style={styles.optionContainer}>
                    <View style={styles.option}>
                        <CalendarPlus color={styles.optionIcons.color} />
                        <Text style={styles.optionText}>Add today's weight</Text>
                    </View>
                    <ChevronRight color={styles.optionIcons.color} />
                </View>
                <View style={styles.optionContainer}>
                    <View style={styles.option}>
                        <LogOut color={'red'} />
                        <Text style={[styles.optionText, { color: 'red' }]}>Logout</Text>
                    </View>
                </View>
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
    imageWrapper: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "#d0d0d0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        marginTop: 100,
        overflow: "hidden",
    },
    profileImage: {
        width: "100%",
        height: "100%",
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
    }
})