import { createContext, useEffect, useState } from "react";
import { exerciseService } from "../../services";

export const ExerciseContext = createContext({
    exercises: []
});

export function ExercisesProvider({ children }) {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        exerciseService.getAll()
            .then((data) => setExercises(data))
            .catch((err) => console.log(err.message))
    }, [])

    const contextValue = {
        exercises,
    };

    return (
        <ExerciseContext.Provider value={contextValue}>
            {children}
        </ExerciseContext.Provider>
    )
}
