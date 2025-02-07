import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext"; // Import Auth Context
import { teacherSignup } from "../../api/authApi"; // Import API function

const TeacherSignup = () => {
  const { login } = useAuth(); // Get login function from Auth Context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPass: "", // Ensure this is used everywhere consistently
    subject: "",
    pin: "", // Additional field for teacher experience
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (formData.password !== formData.confirmPass) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setError(""); // Clear previous errors

      // API call to register teacher
      const data = await teacherSignup({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        confirmPass:formData.confirmPass,
        subject: formData.subject,
        pin: formData.pin,
      });

      if (data) {
        console.log("Signup successful. User:", data.user);

        // Perform login for the user and navigate
        login({ ...data.user, role: "teacher" },navigate);
        // navigate("/teacher-dashboard"); // Redirect to teacher dashboard or home page
      } else {
        setError(data?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("API call failed:", err);
      setError(err?.response?.data?.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Teacher Signup</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Error Display */}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter your mobile number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPass" // Ensure this name matches the state
              placeholder="Confirm your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.confirmPass}
              onChange={handleChange}
              required
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Enter your subject"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">pin (in years)</label>
            <input
              type="number"
              name="pin"
              placeholder="pin"
              className="w-full p-3  focus:ring-blue-400"
              value={formData.pin}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherSignup;
