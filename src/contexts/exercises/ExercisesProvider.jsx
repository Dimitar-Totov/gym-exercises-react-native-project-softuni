import { createContext, useEffect, useState } from "react";
import { commentsService, exerciseService } from "../../services";

export const ExerciseContext = createContext({
    getAllExercises: async () => { },
    getExerciseByType: async (typeOfExercise) => { },
    getExerciseById: async (exerciseId) => { },
    getExerciseByInput: async (exerciseId) => { },
    getExerciseCommentsById: async (exerciseId) => { },
    postExerciseCommentById: async (exerciseId, userId, comment, username) => { },
});

export function ExercisesProvider({ children }) {
    const getAllExercises = async () => await exerciseService.getAll();
    const getExerciseByType = async (typeOfExercise) => await exerciseService.getByType(typeOfExercise);
    const getExerciseById = async (exerciseId) => await exerciseService.getById(exerciseId);
    const getExerciseByInput = async (input) => await exerciseService.getByInput(input);

    const getExerciseCommentsById = async (exerciseId) => commentsService.getComments(exerciseId);
    const postExerciseCommentById = async (exerciseId, userId, comment, username) => commentsService.addComment(exerciseId, userId, comment, username);

    const contextValue = {
        getAllExercises,
        getExerciseByType,
        getExerciseById,
        getExerciseByInput,
        getExerciseCommentsById,
        postExerciseCommentById
    };

    return (
        <ExerciseContext.Provider value={contextValue}>
            {children}
        </ExerciseContext.Provider>
    )
}

