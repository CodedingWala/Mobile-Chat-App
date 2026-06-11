import express from "express";
import AuthRoute from "./routes/AuthRoutes";
import messageRoute from "./routes/messageRoute";
import chatRoute from "./routes/chatRoute";
import userRoute from "./routes/userRoutes";
import { clerkMiddleware } from '@clerk/express'
import { errorHandler } from "./middleware/errorHandler";
const app = express();

app.use(express.json())
app.use(clerkMiddleware())
app.get("/health",(req,res)=>{
    res.json({message:"ok"})
})
app.use("/api/auth",AuthRoute)
app.use("/api/message",messageRoute)
app.use("/api/chat",chatRoute)
app.use("/api/user",userRoute)

app.use(errorHandler)
export default app;