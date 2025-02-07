import express from "express";
import { teacherSignup, studentSignup, login ,logout} from "../controller/authController.js"

const router = express.Router();

// Teacher and Student Signup Routes
router.post("/teacherSignup", teacherSignup);  // Teacher signup route
router.post("/studentSignup", studentSignup);  // Student signup route

// Login and Logout Routes
router.post("/login", login);
router.post('/logout',logout);


export default router;
