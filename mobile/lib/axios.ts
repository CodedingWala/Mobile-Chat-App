// lib/axios.ts
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";

const API_URL = "https://mobile-chat-app-tde5.onrender.com/api";

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

export const useApi = () => {

    useEffect(() => {
        let interceptor: number;

        const setupInterceptor = () => {

            interceptor = api.interceptors.request.use(async (config) => {
                const token = await SecureStore.getItemAsync("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            });
        };

        setupInterceptor();

        return () => {
            if (interceptor) {
                api.interceptors.request.eject(interceptor);
            }
        };
    }, []);

    return api
};