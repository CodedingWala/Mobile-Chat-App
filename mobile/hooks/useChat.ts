// hooks/useLogin.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApi } from "../lib/axios";
import { Chat } from "../types";

export const UseChats = () => {
    const api = useApi();
    return useQuery<Chat[]>({
        queryKey: ["chats"],
        queryFn: async () => {
            console.log("🔵 1. queryFn started - making API call...");
            const { data } = await api.get("/chat");
            console.log("🟢 2. API call succeeded! Data:", data);
            return data ?? [];
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}