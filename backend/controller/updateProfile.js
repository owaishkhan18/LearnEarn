import Teacher from "../models/teacherSchema.js";
import Student from "../models/studentSchema.js"; 

export const updateProfile = async (req, res) => {
    try {
        const { userId, role } = req.params; // Get user ID & role from URL params
        const updateData = req.body; // Get updated profile data from request body

        let user;

        // Check if the user is a teacher or student
        if (role === "teacher") {
            user = await Teacher.findById(userId);
        } else if (role === "student") {
            user = await Student.findById(userId);
        } else {
            return res.status(400).json({ msg: "Invalid role provided" });
        }

        // If user is not found
        if (!user) {
            return res.status(404).json({ msg: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });
        }

        // Update user profile fields dynamically
        Object.keys(updateData).forEach((key) => {
            user[key] = updateData[key]; // Update fields dynamically
        });

        // Check if profile is fully completed (both teachers & students)
        const isProfileComplete = role === "teacher"
            ? (
                user.profile.qualifications.length > 0 &&
                user.profile.experience > 0 &&
                user.profile.bio.trim() !== "" &&
                user.profile.teachingStyle.trim() !== "" &&
                user.profile.profilePicture.trim() !== ""
            )
            : (
                user.profile.grade.trim() !== "" &&
                user.profile.subjects.length > 0 &&
                user.profile.bio.trim() !== "" &&
                user.profile.profilePicture.trim() !== ""
            );

        user.profileCompleted = isProfileComplete; // Update profileCompleted flag

        // Save updated profile
        await user.save();

        res.status(200).json({ msg: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};
