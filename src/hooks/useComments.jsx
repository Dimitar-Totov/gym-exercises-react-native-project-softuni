import { useState, useEffect } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { database } from "../firebaseConfig";

export function useComments(exerciseId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const commentsRef = collection(database, "exercises", exerciseId, "comments");
        const q = query(commentsRef, orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, snapshot => {
            setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => unsubscribe(); 
    }, [exerciseId]);

    return comments; 
}