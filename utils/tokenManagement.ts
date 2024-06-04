import * as secureStore from "expo-secure-store";

let token: string | null = null;

const setToken = async (payload: string) => {
    token = payload;
    if (token !== null) {
        await secureStore.setItemAsync("token", token);
    } else {
        await secureStore.deleteItemAsync("token");
    }
};

const getToken = async () => {
    if (token !== null) {
        return token;
    }
    return (token = await secureStore.getItemAsync("token"));
};

export { setToken, getToken };
