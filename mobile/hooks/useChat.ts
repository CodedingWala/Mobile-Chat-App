// hooks/useLogin.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApi } from "../lib/axios";
import { Chat } from "../types";

export const UseChats = () => {
    const api = useApi();
    return useQuery<Chat[]>({
        queryKey: ["chats"],
        queryFn: async () => {
            const { data } = await api.get("/chat");
            return data ?? [];
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });
}