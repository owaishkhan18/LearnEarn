import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* App Name / Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-extrabold text-blue-600">
          MyApp
        </Link>

        {/* Mobile Menu Button (Only on Mobile) */}
        <button className="md:hidden text-blue-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Desktop Menu (Hidden on Mobile) */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium">
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/signup" className="px-5 py-2 text-blue-600 border border-blue-500 rounded-full hover:bg-blue-600 hover:text-white transition">
                  Sign up as Tutor
                </Link>
              </li>
              <li>
                <Link to="/login" className="px-5 py-2 text-blue-600 border border-blue-500 rounded-full hover:bg-blue-600 hover:text-white transition">
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/profile" className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                Profile
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu (Appears Only When Clicked) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden">
          <ul className="flex flex-col items-center py-4 space-y-4">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/signup" className="block w-full text-center py-3 text-blue-600 border-b border-gray-300 hover:bg-gray-100 transition" onClick={() => setIsOpen(false)}>
                    Sign up as Tutor
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="block w-full text-center py-3 text-blue-600 border-b border-gray-300 hover:bg-gray-100 transition" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/profile" className="block w-full text-center py-3 bg-blue-600 text-white hover:bg-blue-700 transition" onClick={() => setIsOpen(false)}>
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
