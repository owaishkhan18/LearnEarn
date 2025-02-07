import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 flex text-white py-2 min-h-[50px]">
      <div className="container mx-auto text-center">
      <h4 className="mb-1"> Devloped by owaish </h4>
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-gray-400">
            <Facebook size={24} />
          </a>
          <a href="#" className="hover:text-gray-400">
            <Twitter size={24} />
          </a>
          <a href="#" className="hover:text-gray-400">
            <Instagram size={24} />
          </a>
        </div>

        {/* Copyright Text */}
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
