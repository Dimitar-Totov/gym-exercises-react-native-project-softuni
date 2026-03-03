
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { database } from '../firebaseConfig';

export const addWeight = async (userId, date, weight) => {
    await addDoc(collection(database, "users", userId, "weights"), {
        weight,
        date,
    });
};

export const getWeights = async (userId) => {
    const q = query(
        collection(database, "users", userId, "weights"),
        orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => {
        const { date, weight } = doc.data();
        return { date, weight };
    });
};

