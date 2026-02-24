import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebaseConfig";

export async function getAll() {
    const result = await getDocs(collection(database, "exercises"));
    const exercises = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return exercises;
}

export async function getByType(typeOfExercise) {
    const q = query(
        collection(database, "exercises"),
        where("type", "==", typeOfExercise)
    );

    const result = await getDocs(q);
    return result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}