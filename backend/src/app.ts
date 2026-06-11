import express from "express";
import AuthRoute from "./routes/AuthRoutes";
import messageRoute from "./routes/messageRoute";
import chatRoute from "./routes/chatRoute";
import userRoute from "./routes/userRoutes";
const app = express();


app.get("/health",(req,res)=>{
    res.json({message:"ok"})
})
app.use("/authRoute",AuthRoute)
app.use("/messageRoute",messageRoute)
app.use("/chatRoute",chatRoute)
app.use("/userRoute",userRoute)
export default app;