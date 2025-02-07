import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser";

// this is imported routes 
import  authRoutes from "./routes/authRouts.js"


dotenv.config();
// const cors =require("cors")
const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
const PORT= process.env.PORT || 3000;

// app.get("/",(req,res)=>{
//   res.json({msg:"this is done"});
// })
app.use("/api/auth",authRoutes)


const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.listen(PORT,()=>{

    console.log(`server is running on the port ${PORT}`)
})
