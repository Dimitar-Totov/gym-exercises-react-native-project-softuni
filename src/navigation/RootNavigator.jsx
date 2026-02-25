import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";

import { House, Dumbbell, Info, CircleUserRound, LogIn } from "lucide-react-native";

import InfoNavigator from "./InfoNavigator";
import CatalogNavigator from "./CatalogNavigator";
import SignInNavigator from "./SignInNavigator";
import ProfileScreen from "../screens/ProfileScreen";

import { useAuth } from "../contexts/auth/useAuth";
import HomeNavigator from "./HomeNavigator";

export default function RootNavigator() {

    const { isAuthenticated } = useAuth()
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: () => <House />,
                }}
            />
            <Tabs.Screen
                name="Exercises"
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
            {isAuthenticated
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