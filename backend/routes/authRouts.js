import express from "express"
import { Signup } from "../controller/authController.js";
const router=express.Router()

router.post("/Signup/teacher",Signup);
// router.post("/Signup/Student",Singup);



export default router;