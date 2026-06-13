// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useApi } from "../lib/axios";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";
import { Alert } from "react-native";

export const useLogin = () => {
    const api = useApi();

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const { data } = await api.post("/auth/login", credentials);
            return data;
        },
        onSuccess: async (data) => {
            if (data.token) {
                await SecureStore.setItemAsync("token", data.token);
            }
            if (data.user) {
                await SecureStore.setItemAsync("userData", JSON.stringify(data.user));
            }
            router.replace("/(tabs)");
        },
        onError: (error: any) => {
            const message = error.response?.data?.message || "Email or password is incorrect";
            Alert.alert('Login Failed', message);
        },
    });
};



export const useRegister = () => {
    const api = useApi();

    return useMutation({
        mutationFn: async (credentials: { name: string, email: string, password: string }) => {
            const { data } = await api.post("/auth/register", credentials);
            return data;
        },
        onSuccess: async (data) => {
            if (data.token) {
                await SecureStore.setItemAsync("token", data.token);
            }
            if (data.user) {
                await SecureStore.setItemAsync("userData", JSON.stringify(data.user));
            }
            router.replace("/(tabs)");
        },
        
        onError: (error: any) => {
            const message = error.response?.data?.message || "Email already exists";
            console.log(error.response)
            Alert.alert('Registration Failed', message);
        },
    });
};