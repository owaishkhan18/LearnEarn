import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaQuestionCircle,
  FaVideo,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../AuthContext/AuthContext";
import ProfileModal from "./Profile.jsx";

const TeacherDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Default Closed
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("user"));
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar (Mobile Drawer) */}
      <div
        className={`bg-gray-900 text-white p-5 flex flex-col transition-all duration-300 fixed md:relative z-50 h-full 
        ${isSidebarOpen ? "w-64" : "w-0 md:w-64"} md:block overflow-hidden`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white mb-6 text-2xl md:hidden"
        >
          <FaBars />
        </button>

        <img
          src={profile?.profilePicture || "https://via.placeholder.com/80"}
          alt="Profile"
          className="rounded-full border-2 border-white cursor-pointer w-16 h-16 mx-auto mb-4"
          onClick={() => setIsProfileModalOpen(true)}
        />

        {isSidebarOpen && profile && (
          <div className="text-center">
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-sm text-gray-400">{profile.subject}</p>
          </div>
        )}

        <nav className="mt-6 space-y-2">
          <SidebarButton icon={<FaChalkboardTeacher />} label="Dashboard" onClick={() => setActiveTab("dashboard")} active={activeTab === "dashboard"} />
          <SidebarButton icon={<FaBook />} label="Courses" onClick={() => setActiveTab("courses")} active={activeTab === "courses"} />
          <SidebarButton icon={<FaUsers />} label="Students" onClick={() => setActiveTab("students")} active={activeTab === "students"} />
          <SidebarButton icon={<FaQuestionCircle />} label="Quiz" onClick={() => setActiveTab("quiz")} active={activeTab === "quiz"} />
          <SidebarButton icon={<FaVideo />} label="Webcam" onClick={() => setActiveTab("webcam")} active={activeTab === "webcam"} />
          <SidebarButton icon={<FaSignOutAlt />} label="Logout" onClick={() => { logout(); navigate("/login"); }} active={false} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-100">
        {/* Mobile Navbar */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center md:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white text-2xl">
            <FaBars />
          </button>
          <span className="text-lg font-bold">Teacher Dashboard</span>
          <button onClick={() => setIsProfileModalOpen(true)} className="text-white text-2xl">
            <FaUser />
          </button>
        </div>

        {activeTab === "dashboard" && profile && <DashboardContent profile={profile} setIsProfileModalOpen={setIsProfileModalOpen} />}
        {activeTab === "courses" && <CoursesContent />}
        {activeTab === "students" && <StudentsContent />}
        {activeTab === "quiz" && <QuizContent />}
        {activeTab === "webcam" && <WebcamContent />}
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && <ProfileModal profile={profile} setProfile={setProfile} onClose={() => setIsProfileModalOpen(false)} />}
    </div>
  );
};

// Sidebar Button Component
const SidebarButton = ({ icon, label, onClick, active }) => (
  <button
    className={`w-full flex items-center px-4 py-3 rounded-md transition-all duration-300 ${active ? "bg-gray-700" : "hover:bg-gray-800"}`}
    onClick={onClick}
  >
    <span className="text-xl mr-3">{icon}</span>
    <span className="hidden md:inline">{label}</span>
  </button>
);

// Dashboard Content
const DashboardContent = ({ profile, setIsProfileModalOpen }) => (
  <div>
    <h2 className="text-lg md:text-2xl font-bold mb-6">Welcome, {profile?.name || "Teacher"} 👩‍🏫</h2>
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center">
        <img
          src={profile.profilePicture || "https://via.placeholder.com/80"}
          alt="Profile"
          className="rounded-full border-2 border-gray-300 w-16 h-16 md:w-20 md:h-20 mr-4"
        />
        <div>
          <h3 className="text-base md:text-xl font-bold">{profile.name}</h3>
          <p className="text-sm md:text-lg text-gray-600">{profile.subject || "No subject assigned"}</p>
        </div>
      </div>
      <button
        onClick={() => setIsProfileModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 md:mt-0"
      >
        Edit Profile
      </button>
    </div>
  </div>
);

// Other Content Components
const CoursesContent = () => <div><h2 className="text-lg md:text-2xl font-bold">My Courses</h2></div>;
const StudentsContent = () => <div><h2 className="text-lg md:text-2xl font-bold">My Students</h2></div>;
const QuizContent = () => <div><h2 className="text-lg md:text-2xl font-bold">Quiz Section</h2></div>;
const WebcamContent = () => <div><h2 className="text-lg md:text-2xl font-bold">Live Webcam</h2></div>;

export default TeacherDashboard;
