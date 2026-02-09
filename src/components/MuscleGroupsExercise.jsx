import { ScrollView, Text } from "react-native";

export default function MuscleGroupExercise({ route }) {

    const { muscleGroup } = route.params

    return (
        <ScrollView>
            <Text>{muscleGroup}</Text>
        </ScrollView>
    )
}