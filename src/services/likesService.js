import {
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    addDoc,
    doc,
    updateDoc,
    increment
} from "firebase/firestore";

import { database } from "../firebaseConfig";

export async function toggleLikes(exerciseId, userId) {
    const likesCollection = collection(database, "exercises", exerciseId, "likes");

    const q = query(likesCollection, where("userId", "==", userId));
    const result = await getDocs(q);

    const exerciseRef = doc(database, "exercises", exerciseId);

    if (!result.empty) {
        await deleteDoc(result.docs[0].ref);

        await updateDoc(exerciseRef, {
            likesCount: increment(-1),
        });

        return false; 
    }

    await addDoc(likesCollection, {
        userId,
        createdAt: new Date()
    });

    await updateDoc(exerciseRef, {
        likesCount: increment(1),
    });

    return true; 
}