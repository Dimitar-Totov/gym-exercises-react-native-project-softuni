import { createNativeStackNavigator } from "@react-navigation/native-stack"

import AboutUs from "../components/AboutUs";
import InfoScreen from "../screens/InfoScreen";

export default function InfoNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Info Screen" component={InfoScreen} />
            <Stack.Screen name="About Us" component={AboutUs} options={{ headerTitle: 'About Us', headerShown: true, headerBackTitleVisible: false, }} />
        </Stack.Navigator>
    )
}