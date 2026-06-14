import { useQuery } from "@tanstack/react-query";
import { useApi } from "../lib/axios";
import type { Message } from "../types";

export const useMessages = (chatId: string) => {
    const api = useApi();

    return useQuery<Message[]>({
        queryKey: ["messages", chatId],
        queryFn: async () => {
            try {
                const { data } = await api.get(`/message/chat/${chatId}`);
                return data ?? [];
            } catch (error: any) {
                throw error;
            }
        },
        enabled: !!chatId,
    });
};