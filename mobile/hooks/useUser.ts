// hooks/useUsers.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../lib/axios";
import { Chat, User } from "../types";

export const useUsers = () => {
    const api = useApi();
    
    return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await api.get("/user");
            return data || [];
        },
        staleTime: 5 * 60 * 1000, 
        retry: 1,
    });
};


export const useGetOrCreateChat = () => {
    const api = useApi();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (participantId: string) => {
            const { data } = await api.post(`/chat/${participantId}`);
            return data;
        },
        onSuccess: (chat: Chat) => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
            
            return chat;
        },
        onError: (error: any) => {
            console.error("Failed to get/create chat:", error);
            throw new Error(error.response?.data?.message || "Failed to start chat");
        },
    });
};