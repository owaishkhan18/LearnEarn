import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";

import cookieParser from "cookie-parser";

// this is imported routes 
import  authRoutes from "./routes/authRouts.js"


dotenv.config();

const app=express();

app.use(express.json());
const PORT= process.env.PORT || 3000;


app.use("/api/auth",authRoutes)


const connectDB = async () => {
    try {
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); // Exit process with failure
    }
  };
  connectDB();
app.listen(PORT,()=>{

    console.log(`server is running on the port ${PORT}`)
})