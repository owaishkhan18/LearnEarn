import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateTokenAndSetCookie = (req, res, next) => {
    try {
    const {email ,mobile }=req.body;

        // Generate JWT Token
        const token = jwt.sign({ email, mobile }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Set Token in Cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevent client-side access
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "Strict", // Prevent CSRF attacks
            maxAge: 3600000, // 1 hour expiry
        });

        req.token = token; // Attach token to request for further use
        next(); // Proceed to next middleware or controller

    } catch (error) {
        res.status(500).json({ msg: "Error generating token", error: error.message });
    }
};

export default generateTokenAndSetCookie;
