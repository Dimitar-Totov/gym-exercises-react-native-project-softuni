import { createContext, useEffect, useState } from "react";
import { exerciseService } from "../../services";

export const ExerciseContext = createContext({
    getFullBodyExercises: async () => { },
    getByExerciseType: async (typeOfExercise) => { },
    getExerciseById: async (exerciseId) => { },
});

export function ExercisesProvider({ children }) {
    const getFullBodyExercises = async () => await exerciseService.getAll();
    const getByExerciseType = async (typeOfExercise) => await exerciseService.getByType(typeOfExercise);
    const getExerciseById = async (exerciseId) => await exerciseService.getById(exerciseId);
    const contextValue = {
        getFullBodyExercises,
        getByExerciseType,
        getExerciseById,
    };

    return (
        <ExerciseContext.Provider value={contextValue}>
            {children}
        </ExerciseContext.Provider>
    )
}

