import { useContext } from "react";

import { ExerciseContext } from "./ExercisesProvider";

export function useExercises() {
    const context = useContext(ExerciseContext);
    
    return context;
}
