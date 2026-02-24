import { createContext, useEffect, useState } from "react";
import { exerciseService } from "../../services";

export const ExerciseContext = createContext({
    getAllExercises: async () => { },
    getExerciseByType: async (typeOfExercise) => { },
    getExerciseById: async (exerciseId) => { },
});

export function ExercisesProvider({ children }) {
    const getAllExercises = async () => await exerciseService.getAll();
    const getExerciseByType = async (typeOfExercise) => await exerciseService.getByType(typeOfExercise);
    const getExerciseById = async (exerciseId) => await exerciseService.getById(exerciseId);

    const contextValue = {
        getAllExercises,
        getExerciseByType,
        getExerciseById,
    };

    return (
        <ExerciseContext.Provider value={contextValue}>
            {children}
        </ExerciseContext.Provider>
    )
}

