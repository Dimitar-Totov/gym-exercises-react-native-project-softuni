import { launchCameraAsync, useCameraPermissions } from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

import {
    ActivityIndicator,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Button,
} from 'react-native';

export default function CameraCapture({
    onPhotoTaken,
}) {
    const [status, requestPermission] = useCameraPermissions();

    if (!status) {
        return <ActivityIndicator size="large" color="#1fda4b" />;
    }

    if (!status.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Camera access is required to take photos.</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    const takePhotoHandler = async () => {
        const result = await launchCameraAsync({
            allowsEditing: false,
            quality: 0.5,
        })

        if (!result.canceled) {
            if (onPhotoTaken) {
                onPhotoTaken(result.assets[0].uri);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cameraButton} onPress={takePhotoHandler}>
                <Ionicons name="camera-outline" size={24} color="#7eec6a" />
                <Text style={styles.cameraButtonText}>Take Photo</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {alignItems: 'center',marginBlock: 20},
    cameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#0d831f',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        width: '60%'
    },
    cameraButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#71fb8a',
    },
    permissionText: {
        fontSize: 14,
        color: '#058309',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    cameraControls: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },
    bottomControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingBottom: 40,
    },
    spacer: {
        width: 50,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: '#fff',
    },
    flipButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
