import { createNativeStackNavigator } from "@react-navigation/native-stack"

import AboutUs from "../components/AboutUs";
import InfoScreen from "../screens/InfoScreen";

export default function InfoNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Info" component={InfoScreen} />
            <Stack.Screen name="About Us" component={AboutUs} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}