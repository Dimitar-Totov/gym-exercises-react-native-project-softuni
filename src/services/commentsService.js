import {
    collection,
    doc,
    addDoc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";

import { database } from "../firebaseConfig";

export async function addComment(exerciseId, userId, comment, username, profileImage) {
    const commentsRef = collection(database, "exercises", exerciseId, "comments");

    const data = {
        userId,
        username,
        comment,
        createdAt: serverTimestamp(),
    }

    if (profileImage) {
        data.profileImage = profileImage;
    }

    await addDoc(commentsRef, data);
}

export async function deleteExerciseCommentById(exerciseId, commentId) {
    const ref = doc(database, "exercises", exerciseId, "comments", commentId);
    await deleteDoc(ref);
    return true;
}

