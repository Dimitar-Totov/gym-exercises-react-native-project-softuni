import { createNativeStackNavigator } from "@react-navigation/native-stack"

import HomeScreen from "../screens/HomeScreen";
import Details from "../components/Details";

export default function HomeNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Details Page" component={Details} options={{ headerTitle: 'Details', headerShown: true, headerBackTitleVisible: false, }} />
        </Stack.Navigator>
    )
}