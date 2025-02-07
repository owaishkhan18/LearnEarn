import mongoose from "mongoose";

// Profile Schema embedded inside Teacher Schema
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "", // Optional field
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email must be unique
    },
    mobile: {
        type: String,
        required: true, // Mobile number is required
    },
    password: {
        type: String,
        required: true, // Password is required
    },
    role: {
        type: String,
        default: "teacher", // Default role is teacher
    },
    pin:
    {
        type:String,
        require:true,
    },
    profileCompleted: {
        type: Boolean,
        default: false, // Profile completion flag
    },
    profile: {
        qualifications: {
            type: [String],
            default: [],
        },
        experience: {
            type: Number,
            default: 0,
        },
        bio: {
            type: String,
            default: "",
        },
        teachingStyle: {
            type: String,
            default: "",
        },
        profilePicture: {
            type: String,
            default: "",
        },
        socialLinks: {
            type: Map,
            of: String,
            default: {},
        },
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation time
    },
});

// Create Teacher model from schema
const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
