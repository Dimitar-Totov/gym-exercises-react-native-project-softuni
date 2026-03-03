import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { database } from "../firebaseConfig";

export function useLastWeight(userId) {
  const [lastWeight, setLastWeight] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const weightsRef = collection(database, "users", userId, "weights");
    const q = query(weightsRef, orderBy("date", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const { date, weight } = snapshot.docs[0].data();
        setLastWeight({ date, weight });
      } else {
        setLastWeight(0);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  return lastWeight;
}