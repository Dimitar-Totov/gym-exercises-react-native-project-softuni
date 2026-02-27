import {
    collection,
    getDocs,
    query,
    where,
    getDoc,
    doc,
    orderBy,
    limit,
    startAt,
    endAt
} from "firebase/firestore";
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

export async function getByInput(input) {

    if (!input) return null;
    const exercisesRef = collection(database, "exercises");
    const lowered = input.toLowerCase();

    const q = query(
        exercisesRef,
        orderBy("nameLower"),
        startAt(lowered),
        endAt(lowered + "\uf8ff")
    );

    const snap = await getDocs(q);

    return snap.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        image: doc.data()["image-url"]
    }));
}

export async function getTop3Exercises() {
    const exercisesRef = collection(database, "exercises");

    const q = query(
        exercisesRef,
        orderBy("likesCount", "desc"),
        limit(3)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
}