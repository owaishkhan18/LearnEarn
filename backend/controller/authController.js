import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Teacher from "../models/teacherSchema.js";

dotenv.config();
export const teacherSignup = async (req, res) => {
    try {
        const { name, email, mobile, password, confirmPass, subject } = req.body;

        if (!name || !email || !mobile || !password || !confirmPass || !subject) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (password !== confirmPass) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ msg: "Teacher already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save teacher in the database
        const teacher = new Teacher({ name, email, mobile, password: hashedPassword, subject });
        await teacher.save();

        // Generate JWT token
        const token = jwt.sign({ email, role: "teacher" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in HTTP-only cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
        });

        res.status(201).json({ msg: "Teacher registered successfully", token, role: "teacher" });

    } catch (error) {
        res.status(500).json({ msg: "There is something wrong", error: error.message });
    }
};

// 🎓 Student Signup Function
export const studentSignup = async (req, res) => {
    try {
        const { name, email, mobile, password, confirmPass } = req.body;

        if (!name || !email || !mobile || !password || !confirmPass) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (password !== confirmPass) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ msg: "Student already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save student in the database
        const student = new Student({ name, email, mobile, password: hashedPassword });
        await student.save();

        // Generate JWT token
        const token = jwt.sign({ email, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in HTTP-only cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
        });

        res.status(201).json({ msg: "Student registered successfully", token, role: "student" });

    } catch (error) {
        res.status(500).json({ msg: "There is something wrong", error: error.message });
    }
};


// Login Function for both Teachers and Students
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        // Check if the user is a teacher
        let user = teachers.find((teacher) => teacher.email === email);

        // If not a teacher, check if the user is a student
        if (!user) {
            user = students.find((student) => student.email === email);
        }

        // If user doesn't exist
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in HTTP-only cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookie in production
            sameSite: "Strict", // CSRF protection
            maxAge: 3600000, // 1 hour expiry
        });

        res.status(200).json({ msg: `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} logged in successfully`, token, role: user.role });

    } catch (error) {
        res.status(500).json({ msg: "There is something wrong", error: error.message });
    }
};
