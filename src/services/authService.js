import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebaseConfig";

export async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
}