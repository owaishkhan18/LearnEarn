import express from "express"
import { teacherSignup ,studentSignup ,login } from "../controller/authController.js";
const router=express.Router()

router.post("/Signup/teacher",teacherSignup);
router.post("/Signup/Student",studentSignup);
router.post("/Login",login)



export default router;