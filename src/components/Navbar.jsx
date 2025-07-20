import { Link } from "react-router-dom";
import { Settings, LayoutDashboard, Files } from "lucide-react";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-9 w-9 rounded-full" />
            <span className="text-xl font-bold text-white">Study Tracker</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link
              to="/papers"
              className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Files size={18} />
              Papers
            </Link>
            <Link
              to="/settings"
              className="p-2 rounded-full text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Settings"
            >
              <Settings size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
