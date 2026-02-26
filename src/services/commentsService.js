import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";

import { database } from "../firebaseConfig";

export async function addComment(exerciseId, userId, comment, username) {
    const commentsRef = collection(database, "exercises", exerciseId, "comments");

    await addDoc(commentsRef, {
        userId,
        username,
        comment,
        createdAt: serverTimestamp(),
    });
}

export async function deleteExerciseCommentById(exerciseId, commentId) {
    try {
        const ref = doc(database, "exercises", exerciseId, "comments", commentId);
        await deleteDoc(ref);
        return true;
    } catch (error) {
        console.log("Delete comment error:", error.message);
    }
}

