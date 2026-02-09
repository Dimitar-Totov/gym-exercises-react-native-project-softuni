import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../screens/HomeScreen";
import MuscleGroupExercise from "../components/MuscleGroupsExercise";

export default function HomeNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Screen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Muscle Groups" component={MuscleGroupExercise} options={({ route }) => ({ title: route.params?.muscleGroup || "Default Title", })} />
        </Stack.Navigator>
    )
}