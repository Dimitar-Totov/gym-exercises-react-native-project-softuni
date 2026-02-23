import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";

import { House, Dumbbell, Info, CircleUserRound, LogIn } from "lucide-react-native";

import InfoNavigator from "./InfoNavigator";
import CatalogNavigator from "./CatalogNavigator";
import SignInNavigator from "./SignInNavigator";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

export default function RootNavigator() {

    const [user, setUser] = useState(null);
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <House />,
                }}
            />
            <Tabs.Screen
                name="Catalog"
                component={CatalogNavigator}
                options={{
                    tabBarIcon: () => <Dumbbell />,
                }}
            />
            <Tabs.Screen
                name="Info"
                component={InfoNavigator}
                options={{
                    tabBarIcon: () => <Info />,
                }}
            />
            {user
                ? <Tabs.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: () => <CircleUserRound />,
                    }}
                />
                : <Tabs.Screen
                    name="Sign In"
                    component={SignInNavigator}
                    options={{
                        tabBarIcon: () => <LogIn />,
                    }}
                />
            }
        </Tabs.Navigator>
    );
}