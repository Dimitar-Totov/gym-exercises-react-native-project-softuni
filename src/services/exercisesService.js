import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebaseConfig";

export async function getAll() {
    const result = await getDocs(collection(database, "exercises"));
    const exercises = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return exercises;
}