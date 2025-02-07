import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Logout } from "../../api/authApi.js"; // Your logout API function

const AuthContext = createContext(); // ✅ Create Context

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Retrieved User Data from localStorage:", storedUser); // Debugging
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate(); // Initialize navigate here

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("user", JSON.stringify(authUser)); // Update localStorage when authUser changes
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage if no user
    }
  }, [authUser]);

  const login = (userData, navigate) => {
    console.log("Login function called with data:", userData);
    
    // Update state
    setAuthUser(userData); 

    try {
      localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
      console.log("User Data Stored in localStorage:", localStorage.getItem("user")); // Check if it’s stored
    } catch (error) {
      console.error("Error saving to localStorage:", error); // Catch any potential localStorage errors
    }

    // After saving, navigate if required
    // if (navigate) {
    //   navigate(`/dashboard/${userData.role}`);
    // }
  };

  const logout = async () => {
    try {
      const res = await Logout();
      if (res.msg === "Logged out successfully") {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("user"); // Clear the user from localStorage
        setAuthUser(null); // Clear user from state
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed:", res);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Named export for useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// export default AuthContext;
