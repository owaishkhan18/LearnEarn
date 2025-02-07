import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom for navigation
import Footer from "./Homes/Footer.jsx";
import Hero from "./Homes/Hero.jsx"
import Navbar from "./Homes/Navbar.jsx";
import StudentDashboard from "../components/StudentDashboard/StudentDashboard.jsx"

import TeacherDashBoard from "../components/TeacherDashboard/Dashboard.jsx"
const HomePage = () => {
  return  <div className="h-full flex flex-col bg-gray-100 ">
      <Navbar/>  
      <Hero/>
      <Footer/>
    </div>
 
};

export default HomePage;
