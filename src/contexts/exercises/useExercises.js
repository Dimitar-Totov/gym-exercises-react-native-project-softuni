import { useContext } from "react";

import { ExercisesProvider } from "./ExercisesProvider";

export function useExercises() {
    const context = useContext(ExercisesProvider);
    
    return context;
}
