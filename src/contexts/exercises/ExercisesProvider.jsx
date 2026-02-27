import { createContext } from "react";
import { commentsService, exerciseService, likesService } from "../../services";

export const ExerciseContext = createContext({
    getAllExercises: async () => { },
    getExerciseByType: async (typeOfExercise) => { },
    getExerciseById: async (exerciseId) => { },
    getThreeMostLikedExercises: async () => { },
    getExerciseByInput: async (exerciseId) => { },
    postExerciseCommentById: async (exerciseId, userId, comment, username) => { },
    deleteExerciseCommentById: async (exerciseId, commentId) => { },
    toggleLikes: async (exerciseId, userId) => { }
});

export function ExercisesProvider({ children }) {
    const getAllExercises = async () => await exerciseService.getAll();
    const getExerciseByType = async (typeOfExercise) => await exerciseService.getByType(typeOfExercise);
    const getExerciseById = async (exerciseId) => await exerciseService.getById(exerciseId);
    const getExerciseByInput = async (input) => await exerciseService.getByInput(input);
    const getThreeMostLikedExercises = async () => await exerciseService.getTop3Exercises();

    const postExerciseCommentById = async (exerciseId, userId, comment, username) => commentsService.addComment(exerciseId, userId, comment, username);
    const deleteExerciseCommentById = async (exerciseId, commentId) => commentsService.deleteExerciseCommentById(exerciseId, commentId);

    const toggleLikes = async (exerciseId, userId) => likesService.toggleLikes(exerciseId, userId);

    const contextValue = {
        getAllExercises,
        getExerciseByType,
        getExerciseById,
        getThreeMostLikedExercises,
        getExerciseByInput,
        postExerciseCommentById,
        deleteExerciseCommentById,
        toggleLikes
    };

    return (
        <ExerciseContext.Provider value={contextValue}>
            {children}
        </ExerciseContext.Provider>
    )
}

