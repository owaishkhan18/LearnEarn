import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { Link } from "react-router-dom";

const SignupPage = () => {


  const [userType, setUserType] = useState(null); // Track the selected user type
  const navigate = useNavigate(); // Initialize the navigate function

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    if (type === "teacher") {
      navigate("/signup/teacher"); // Navigate to Teacher signup route
    } else if (type === "student") {
      navigate("/signup/student"); // Navigate to Student signup route
    }
  };

  return (
    <section className="bg-blue-600 text-white min-h-screen flex flex-col justify-center py-8 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Create an Account</h1>
        <p className="text-lg mb-6">Please select your account type:</p>

        {/* User Type Selection */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            onClick={() => handleUserTypeSelection("teacher")}
            className={`px-8 py-3 rounded-lg font-semibold ${userType === "teacher" ? "bg-white text-blue-600" : "bg-blue-800 hover:bg-blue-700"}`}
          >
            Sign up as Teacher
          </button>
          <button
            onClick={() => handleUserTypeSelection("student")}
            className={`px-8 py-3 rounded-lg font-semibold ${userType === "student" ? "bg-white text-blue-600" : "bg-blue-800 hover:bg-blue-700"}`}
          >
            Sign up as Student
          </button>
        </div>

        {/* Additional Links */}
        <div className="mt-6">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-300 hover:text-white">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
