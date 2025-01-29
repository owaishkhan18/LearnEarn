import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

// this is imported routes 
import  authRoutes from "./routes/authRouts.js"


dotenv.config();

const app=express();

app.use(express.json());
const PORT= process.env.PORT || 3000;


app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{

    console.log(`server is running on the port ${PORT}`)
})