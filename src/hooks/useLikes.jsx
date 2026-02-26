import { useState, useEffect } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebaseConfig";

export function useLikes(exerciseId) {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        const likesRef = collection(database, "exercises", exerciseId, "likes");

        const unsubscribe = onSnapshot(likesRef, snapshot => {
            const userIds = snapshot.docs.map(doc => doc.data().userId);
            setLikes(userIds);
        });

        return () => unsubscribe(); 
    }, [exerciseId]);

    return likes;
}