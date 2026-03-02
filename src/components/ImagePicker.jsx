import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync, MediaType } from 'expo-image-picker';


export default function ImagePicker({
    imageUri,
    onImagePicked,
    profileImage
}) {
    const requestPermission = async () => {
        const { status } = await requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission denied! You need to grant camera roll permissions to use this feature.');

            return false;
        }

        return true;
    };

    const pickImageHandler = async () => {
        const hasPermission = await requestPermission();

        if (!hasPermission) {
            return;
        }

        const result = await launchImageLibraryAsync({
            quality: 0.3,
        });

        onImagePicked(result.assets[0].uri);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.picker} onPress={pickImageHandler}>
                {profileImage
                    ? <Image source={{ uri: profileImage }} style={styles.image} />
                    : (
                        <View style={styles.placeholder}>
                            <Ionicons name="images-outline" size={48} color="#40e12a" />
                            <Text style={styles.placeholderText}>Tap to select from gallery</Text>
                        </View>
                    )}
            </TouchableOpacity>

            {(imageUri || profileImage) && (
                <TouchableOpacity style={styles.changeButton} onPress={pickImageHandler}>
                    <Ionicons name="refresh" size={16} color="#09e414" />
                    <Text style={styles.changeText}>Change Image</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        alignItems: 'center'
    },
    picker: {
        width: '50%',
        height: 200,
        borderRadius: '50%',
        backgroundColor: '#ddd'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    placeholderText: {
        fontSize: 14,
        color: '#16b810',
        fontWeight: '500',
    },
    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 12,
        padding: 8,
    },
    changeText: {
        fontSize: 14,
        color: '#209f0a',
        fontWeight: '600',
    },
});

