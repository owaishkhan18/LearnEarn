import { useState,useNavigate } from "react";
import { FaBars, FaTimes, FaUser, FaBookOpen, FaSignOutAlt, FaChalkboardTeacher, FaQuestionCircle } from "react-icons/fa";
import {Logout} from "../../api/authApi.js"
import { useAuth } from "../AuthContext/AuthContext.jsx";
const StudentDashboard = () => {
  const {logout }=useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("feed");
  // const navigate = useNavigate(); // Initialize navigation


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-blue-900 text-white p-4 flex flex-col h-full shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Toggle Button */}
        <button
          className="text-white text-2xl mb-6 self-end focus:outline-none transition-all duration-300"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar Menu */}
        <nav className="flex flex-col space-y-2 overflow-hidden">
          <SidebarButton icon={<FaUser />} label="Profile" onClick={() => setActiveTab("profile")} active={activeTab === "profile"} sidebarOpen={sidebarOpen} />
          <SidebarButton icon={<FaBookOpen />} label="Course Feed" onClick={() => setActiveTab("feed")} active={activeTab === "feed"} sidebarOpen={sidebarOpen} />
          <SidebarButton icon={<FaChalkboardTeacher />} label="My Courses" onClick={() => setActiveTab("myCourses")} active={activeTab === "myCourses"} sidebarOpen={sidebarOpen} />
          <SidebarButton icon={<FaQuestionCircle />} label="Quizzes" onClick={() => setActiveTab("quiz")} active={activeTab === "quiz"} sidebarOpen={sidebarOpen} />
          <SidebarButton icon={<FaSignOutAlt />} label="Logout" onClick={logout} active={false} sidebarOpen={sidebarOpen} />

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-blue-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-md">
          <button className="text-white text-2xl focus:outline-none transition-all duration-300" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="text-lg font-bold">Student Dashboard</h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-y-auto mt-16 transition-all duration-300">
          {activeTab === "profile" && <ProfileContent />}
          {activeTab === "feed" && <FeedContent />}
          {activeTab === "myCourses" && <MyCourses />}
          {activeTab === "quiz" && <QuizSection />}
        </div>
      </div>
    </div>
  );
};

// Sidebar Button Component
const SidebarButton = ({ icon, label, onClick, active, sidebarOpen }) => (
  <button
    className={`flex items-center px-4 py-3 rounded-md text-lg transition-all duration-300 w-full ${
      active ? "bg-blue-700" : "hover:bg-blue-800"
    }`}
    onClick={onClick}
  >
    <span className="text-xl">{icon}</span>
    <span className={`ml-3 transition-all duration-300 ease-in-out ${sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}>
      {label}
    </span>
  </button>
);






const ProfileContent = () => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
    <img src="https://via.placeholder.com/150" alt="Profile" className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500" />
    <h2 className="text-2xl font-bold mb-2">John Doe</h2>
    <p className="text-gray-600 mb-4">Student at XYZ University</p>
    <div className="w-full text-left">
      <p className="text-lg font-semibold">Email:</p>
      <p className="text-gray-700 mb-2">johndoe@example.com</p>
      <p className="text-lg font-semibold">Course:</p>
      <p className="text-gray-700 mb-4">Web Development</p>
    </div>
    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">Edit Profile</button>
  </div>
);

const FeedContent = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Course Feed</h2>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <CourseCard title="React Basics" description="Learn the fundamentals of React and start building interactive UIs." />
      <CourseCard title="Advanced JavaScript" description="Deep dive into JavaScript ES6+ features and best practices." />
      <CourseCard title="Web Design Principles" description="Understand the core principles of modern web design and UX/UI." />
    </div>
  </div>
);

const MyCourses = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">My Courses</h2>
    <CourseCard title="Full-Stack Development" description="Master frontend and backend development with real-world projects." />
    <CourseCard title="Data Structures & Algorithms" description="Learn DSA to improve problem-solving and coding skills." />
  </div>
);

const QuizSection = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Quizzes</h2>
    <p>Test your knowledge with interactive quizzes!</p>
    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">Start Quiz</button>
  </div>
);

const CourseCard = ({ title, description }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-700 mb-3">{description}</p>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">View Course</button>
  </div>
);

export default StudentDashboard;
