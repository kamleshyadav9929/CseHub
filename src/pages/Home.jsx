import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaCalendarAlt,
  FaChartLine,
  FaBell,
  FaCog,
} from "react-icons/fa";
import logo from "../assets/logo.jpg";
import hero from "../assets/hero.jpg";
import HamburgerMenu from "../components/HamburgerMenu";

export default function Home() {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Subjects", icon: <FaBook />, path: "/dashboard" },
    { label: "Day Tracker", icon: <FaCalendarAlt />, path: "/day-tracker" },
    { label: "Analytics", icon: <FaChartLine />, path: "/analytics" },
    { label: "Reminders", icon: <FaBell />, path: "/reminders" },
    { label: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-8">
      {/* Hamburger Menu */}
      <HamburgerMenu />
      {/* Header */}
      <header className="flex items-center gap-3 mb-10">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-12 rounded-full border border-blue-400"
        />
        <h1 className="text-2xl font-bold"> Study Tracker</h1>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full gap-10">
        {/* Text */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold mb-4">
            Your Smart Companion to Track Your Studies
          </h2>
          <p className="text-gray-300 mb-6">
            Track topics, monitor progress, set reminders & stay ahead in your
            semester. Let’s study smart!
          </p>
          <button
            onClick={() => navigate("/day-tracker")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold transition"
          >
            Start tracking
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center ">
          <img
            src={hero}
            alt="Study Tracker Hero"
            className="w-full max-w-xs sm:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="mt-16 w-full max-w-5xl text-center ">
        <h2 className="text-2xl font-semibold mb-6 text-blue-400">
          🔗 Quick Links
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {quickLinks.map((link, i) => (
            <div
              key={i}
              onClick={() => handleNavigate(link.path)}
              className="bg-gray-800 hover:bg-blue-600 cursor-pointer transition-all p-4 rounded-xl flex flex-col items-center shadow"
            >
              <div className="text-2xl mb-2">{link.icon}</div>
              <p className="text-sm font-medium">{link.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-400 text-center">
        Made with ❤️ for BIT Patna CSE Students
      </footer>
    </div>
  );
}
