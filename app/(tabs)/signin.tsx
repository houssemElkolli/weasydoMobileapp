import {
    StyleSheet,
    Text,
    SafeAreaView,
    TextInput,
    View,
    Pressable,
} from "react-native";

import React from "react";
import { router } from "expo-router";
import { setToken } from "@/utils/tokenManagement";

export default function signin({ navigation }: any) {
    const [authState, setAuthState] = React.useState<{
        username: string;
        password: string;
    }>({ username: "", password: "" });
    const [error, setError] = React.useState<{
        message: string;
        status: boolean;
    }>({ message: "", status: false });

    const handlePress = async () => {
        console.log(authState);

        let data = { token: "" };
        try {
            const res = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    username: authState.username,
                    password: authState.password,
                }),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                data = await res.json();
                setToken(data.token);
                router.navigate("/");
            }
            if (res.status === 401)
                setError({ message: "wrong Credantials", status: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sign In </Text>
            {error.status && <Text style={styles.error}>{error.message}</Text>}
            <View style={{ marginBottom: 5 }}>
                <Text style={{ marginBottom: 10, color: "#43454e" }}>
                    User Name
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) =>
                        setAuthState((old) => ({ ...old, username: text }))
                    }
                    placeholder="Jhon Doe"
                    value={authState.username}
                />
            </View>

            <View>
                <Text
                    style={{
                        marginBottom: 10,
                        color: "#43454e",
                    }}
                >
                    Password
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) =>
                        setAuthState((old) => ({ ...old, password: text }))
                    }
                    value={authState.password}
                    placeholder="JD123..."
                    secureTextEntry
                />
            </View>

            <Pressable onPress={handlePress} style={styles.submit}>
                <Text style={{ color: "#FFFFFF" }}>Sign In</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontSize: 36,
        letterSpacing: 1,
        fontWeight: "bold",
    },
    input: {
        borderColor: "gray",
        width: 300,
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        color: "#777",
    },
    submit: {
        borderRadius: 15,
        backgroundColor: "#FBD103",
        alignItems: "center",
        padding: 10,
        width: 250,
        marginTop: 10,
    },
    error: {
        color: "red",
    },
});
