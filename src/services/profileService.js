import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateProfile,
    updatePassword,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, storage } from "../firebaseConfig";

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

export async function uploadProfileImage(userId, imageUri) {

    const response = await fetch(imageUri);
    const imageBlob = await response.blob();

    const imageRef = ref(storage, `userImage/${userId}.jpg`);
    await uploadBytes(imageRef, imageBlob);
}

export async function loadProfileImage(userId) {
    const imageRef = ref(storage, `userImage/${userId}.jpg`);
    const imageUrl = await getDownloadURL(imageRef);

    return imageUrl;
}
