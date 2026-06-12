import express from "express";
import AuthRoute from "./routes/AuthRoutes";
import messageRoute from "./routes/messageRoute";
import chatRoute from "./routes/chatRoute";
import userRoute from "./routes/userRoutes";
import { clerkMiddleware } from '@clerk/express'
import { errorHandler } from "./middleware/errorHandler";
import job from "./utils/corn";


const mode = process.env.NODE_ENV
const app = express();


if (mode == "production") {
    job.start()
}


app.use(express.json())
app.use(clerkMiddleware())
app.get("/health", (req, res) => {
    res.json({ message: "backend server is running correctly" })
})
app.use("/api/auth", AuthRoute)
app.use("/api/message", messageRoute)
app.use("/api/chat", chatRoute)
app.use("/api/user", userRoute)

app.use(errorHandler)
export default app;