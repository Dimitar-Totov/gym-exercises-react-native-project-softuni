import { createNativeStackNavigator } from "@react-navigation/native-stack"

import SignInScreen from "../screens/SignInScreen";
import SignUp from "../components/SignUp";

export default function SignInNavigator() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: 'Create an account', headerShown: true, headerBackTitleVisible: false, }} />
        </Stack.Navigator>
    )
}