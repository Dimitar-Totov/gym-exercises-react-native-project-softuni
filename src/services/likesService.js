import {
    collection,
    addDoc,
    query,
    getDocs,
    where,
    deleteDoc
} from "firebase/firestore";

import { database } from "../firebaseConfig";

export async function toggleLikes(exerciseId, userId) {
    const likesCollection = collection(database, "exercises", exerciseId, "likes");

    const q = query(likesCollection, where("userId", "==", userId));
    const result = await getDocs(q);

    if (!result.empty) {
        await deleteDoc(result.docs[0].ref);
        return false;
    } else {
        await addDoc(likesCollection, { userId, createdAt: new Date() });
        return true;
    }
}
