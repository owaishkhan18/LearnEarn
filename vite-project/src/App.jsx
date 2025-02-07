import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from "./pages/Signup.jsx";
import Home from "./pages/HomePage.jsx";
import TeacherSignup from "./pages/Singup/Teacher.jsx";
import StudentSignup from "./pages/Singup/Student.jsx"; 
import Login from "./pages/Login.jsx";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard.jsx";
import TeacherDashboard from "./components/TeacherDashboard/Dashboard.jsx"; // Add TeacherDashboard if needed
import { useAuth } from "./components/AuthContext/AuthContext.jsx";

const App = () => {
  const { authUser } = useAuth(); // Get the authenticated user

  return (
    <div className="h-full">
      <Routes>
        {/* Home Route */}
        <Route 
          path="/" 
          element={
            !authUser ? (
              <Home /> // Show home if not logged in
            ) : authUser.role === 'student' ? (
              <StudentDashboard /> // Redirect student to their dashboard
            ) : authUser.role === 'teacher' ? (
              <TeacherDashboard /> // Redirect teacher to their dashboard
            ) : (
              <Home /> // Fallback to home in case of any issue
            )
          } 
        />
        
        {/* General Signup Page */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignupPage />} // Redirect to home if logged in
        />

        {/* Teacher & Student Signup Routes */}
        <Route
          path="/signup/teacher"
          element={authUser ? <Navigate to="/" /> : <TeacherSignup />} // Redirect if already logged in
        />
        <Route
          path="/signup/student"
          element={authUser ? <Navigate to="/" /> : <StudentSignup />} // Redirect if already logged in
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />} // Redirect to home if logged in
        />
      </Routes>
    </div>
  );
};

export default App;
