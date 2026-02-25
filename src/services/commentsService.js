import {
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    getDocs,
} from "firebase/firestore";

import { database } from "../firebaseConfig";

export async function getComments(exerciseId) {
    const q = query(
        collection(database, "exercises", exerciseId, "comments"),
        orderBy("createdAt", "asc")
    );

    const result = await getDocs(q);

    return result.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function addComment(exerciseId, userId, comment, username) {
    const commentsRef = collection(database, "exercises", exerciseId, "comments");

    await addDoc(commentsRef, {
        userId,
        username,
        comment,
        createdAt: serverTimestamp(),
    });
}

