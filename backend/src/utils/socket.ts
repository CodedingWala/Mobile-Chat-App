import { Socket, Server as socketServer } from "socket.io"
import { Server as httpServer } from "http"
import { User } from "../models/User"
import { Message } from "../models/message"
import { Chat } from "../models/Chat"
import { cron } from "bun"
import { verifyToken } from "@clerk/express"


export const onlineUsers: Map<String, String> = new Map()

export async function initializeSocket(httpServer: httpServer) {
    const allowedOrigins = [
        "http://localhost:8081",
        "http://localhost:5173",
        process.env.FRONTEND_URL,
    ].filter(Boolean) as string[];


    const io = new socketServer(httpServer, { cors: { origin: allowedOrigins } })

    io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Authentication error"));
        try {
            const session = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY! });

            const clerkId = session.sub;

            const user = await User.findOne({ clerkId });
            if (!user) return next(new Error("User not found"));

            socket.data.userId = user._id.toString();

            next();
        } catch (error: any) {
            next(new Error(error));
        }
    });

    io.on("connection", (socket) => {
        const userId = socket.data.userId;

        socket.emit("online-users", { userIds: Array.from(onlineUsers.keys()) })

        onlineUsers.set(userId, socket.id);

        socket.broadcast.emit("user-online", { userId })

        socket.join(`user:${userId}`)

        socket.on("join-chat", (chatId: string) => {
            socket.join(`chat:${chatId}`)
        })

        socket.on("leave-chat", (chatId) => {
            socket.leave(`chat:${chatId}`)
        })

        socket.on("send-message", async (data: { chatId: string, text: string }) => {

            try {
                const { chatId, text } = data
                const chat = await Chat.findOne({
                    _id: chatId,
                    participants: userId
                })

                if (!chat) {
                    socket.emit("socket-error", { message: "Chat not found" });
                    return;
                }

                const newMessage = await Message.create({
                    chat: chatId,
                    sender: userId,
                    text: text
                })

                chat.lastMessage = newMessage._id;
                chat.lastMessageAt = new Date();
                await chat.save();



                await newMessage.populate("sender", "name avatar");

                io.to(`chat:${chatId}`).emit("new-message", { newMessage })

                for (const participant of chat?.participants) {
                    io.to(`user:${participant}`).emit("new-message", { newMessage })
                }
            } catch (error) {
                socket.emit("socket-error", { message: "Failed to send message" });
            }

        })


        socket.on("disconnect", () => {
            onlineUsers.delete(userId)
            socket.broadcast.emit("user-offline", { userId })
        })

    })
    return io
}