import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-blue-600 text-white py-20 px-4 min-h-screen flex items-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to MyApp
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Build amazing web applications with ease.
        </p>
        <Link
          to="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

