import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const teachers = []; // Temporary storage (Replace with DB in production)

export const Signup = async (req, res) => {
    try {
        const { name, email, mobile, password, confirmPass, subject } = req.body;

        if (!name || !email || !mobile || !password || !confirmPass || !subject) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        if (password !== confirmPass) {
            return res.status(400).json({ msg: "Passwords do not match" });
        }

        // Check if teacher already exists
        const existingTeacher = teachers.find((teacher) => teacher.email === email);
        if (existingTeacher) {
            return res.status(400).json({ msg: "Teacher already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save teacher (Replace this with DB save operation)
        const teacher = { name, email, mobile, password: hashedPassword, subject, role: "teacher" };
        teachers.push(teacher);

        // Generate JWT token
        const token = jwt.sign({ email, role: "teacher" }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set token in HTTP-only cookies
        res.cookie("token", token, {
            httpOnly: true, // Prevent client-side access
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "Strict", // CSRF protection
            maxAge: 3600000, // 1 hour expiry
        });

        res.status(201).json({ msg: "Teacher registered successfully", token, role: "teacher" });

    } catch (error) {
        res.status(500).json({ msg: "There is something wrong", error: error.message });
    }
};
