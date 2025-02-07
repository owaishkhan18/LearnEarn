import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Teacher from "../models/teacherSchema.js";
import Student from "../models/studentSchema.js";

dotenv.config();

/** ✅ TEACHER SIGNUP */
export const teacherSignup = async (req, res) => {
    try {
        const { name, email, mobile, password, confirmPass, subject, pin } = req.body;

        if (!name || !email || !mobile || !password || !confirmPass || !subject || !pin) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (password !== confirmPass) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ msg: "Teacher already registered" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const teacher = new Teacher({ name, email, mobile, password: hashedPassword, subject, role: "teacher" });
        await teacher.save();

        // Generate JWT token
        const token = jwt.sign({ email, role: "teacher", id: teacher._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in HTTP-only cookies
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 3600000 });

        res.status(201).json({ msg: "Teacher registered successfully", token, role: "teacher", user: { id: teacher._id, name, email, role: "teacher" } });

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};

/** ✅ STUDENT SIGNUP */
export const studentSignup = async (req, res) => {
    try {
        const { name, email, mobile, password, confirmPass } = req.body;

        if (!name || !email || !mobile || !password || !confirmPass) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (password !== confirmPass) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ msg: "Student already registered" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({ name, email, mobile, password: hashedPassword, role: "student" });
        await student.save();

        // Generate JWT token
        const token = jwt.sign({ email, role: "student", id: student._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in HTTP-only cookies
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 3600000 });

        res.status(201).json({ msg: "Student registered successfully", token, role: "student", user: { id: student._id, name, email, role: "student" } });

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};

/** ✅ LOGIN FUNCTION */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        let user = await Teacher.findOne({ email }) || await Student.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check if password matches
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email, role: user.role, id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in HTTP-only cookies
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict", maxAge: 3600000 });

        res.status(200).json({ msg: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} logged in successfully`, token, role: user.role, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};

/** ✅ LOGOUT FUNCTION */
export const logout = (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });

        return res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Error logging out", error: error.message });
    }
};
