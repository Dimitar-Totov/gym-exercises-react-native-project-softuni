import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateProfile,
    updatePassword,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as FileSystem from "expo-file-system";

import { auth } from "../firebaseConfig";

export async function updateUser(username, password, currentPassword) {
    const user = auth.currentUser;

    if (password) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, password);
    }

    if (username !== user.displayName) {
        await updateProfile(user, { displayName: username });
    }

    return user;
}

export async function uploadProfileImage(userId, localUri) {
    try {
        const file = await FileSystem.readAsStringAsync(localUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        const blob = Buffer.from(file, "base64");
        const imageRef = ref(storage, `profileImages/${userId}.jpg`);
        await uploadBytes(imageRef, blob);
        const downloadUrl = await getDownloadURL(imageRef);
        return downloadUrl;
    } catch (err) {
        console.log("Upload error:", err);
        throw new Error("Failed to upload profile image.");
    }
}