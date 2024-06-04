import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getToken } from "@/utils/tokenManagement";
import * as SecureStore from "expo-secure-store";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors["light" ?? "light"].tint,
                headerShown: true,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "home" : "home-outline"}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="products/[id]"
                options={{
                    href: null,
                    title: "Product",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "code-slash" : "code-slash-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="products"
                options={{
                    title: "Products",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "code-slash" : "code-slash-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="signin"
                options={{
                    title: "Sign In",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "code-slash" : "code-slash-outline"}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
