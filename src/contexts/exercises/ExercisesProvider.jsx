import { createContext, useEffect, useState } from "react";
import { exerciseService } from "../../services";

export const ExerciseContext = createContext({
    getFullBodyExercises: async () => { },
    getByExerciseType: async (typeOfExercise) => { },
});

export function ExercisesProvider({ children }) {
    const getFullBodyExercises = async () => await exerciseService.getAll();
    const getByExerciseType = async (typeOfExercise) => await exerciseService.getByType(typeOfExercise);

    const contextValue = {
        getFullBodyExercises,
        getByExerciseType,
    };

    return (
        <ExerciseContext.Provider value={contextValue}>
            {children}
        </ExerciseContext.Provider>
    )
}

