import { useSocketStore } from "../lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';

const SocketConnection = () => {
    const queryClient = useQueryClient();
    const connect = useSocketStore((state) => state.connect);
    const disconnect = useSocketStore((state) => state.disconnect);

    useEffect(() => {
        const connectSocket = async () => {
            const token = await SecureStore.getItemAsync("token")
            if (token) connect(token, queryClient);
            else {
                disconnect();
            }
        }
        connectSocket()

        return () => {
            disconnect();
        };
    }, [connect, disconnect, queryClient]);

    return null;
};

export default SocketConnection;