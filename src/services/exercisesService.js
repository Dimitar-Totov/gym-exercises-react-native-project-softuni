import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
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

export async function getById(exerciseId) {
    const result = await getDoc(doc(database, 'exercises', exerciseId));
    return { id: result.id, ...result.data() };
}