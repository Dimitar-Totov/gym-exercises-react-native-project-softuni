import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { House, Dumbbell, Info, CircleUserRound } from "lucide-react-native";

import HomeScreen from "../screens/HomeScreen";
import CatalogScreen from "../screens/CatalogScreen";
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";

export default function RootNavigator() {

    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <House />,
                }}
            />
            <Tabs.Screen
                name="Catalog"
                component={CatalogScreen}
                options={{
                    tabBarIcon: () => <Dumbbell />,
                }}
            />
            <Tabs.Screen
                name="About"
                component={AboutScreen}
                options={{
                    tabBarIcon: () => <Info />,
                }}
            />
            <Tabs.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => <CircleUserRound />,
                }}
            />
        </Tabs.Navigator>
    );
}