import {
    reauthenticateWithCredential,
    EmailAuthProvider,
    updateProfile,
    updatePassword
} from "firebase/auth";

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