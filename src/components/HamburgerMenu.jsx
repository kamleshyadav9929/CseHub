// File: src/components/HamburgerMenu.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  BarChart3,
  CalendarDays,
  Bell,
  Settings2,
  Home,
} from "lucide-react";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/day-tracker", label: "Day Tracker", icon: CalendarDays },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
    { to: "/reminders", label: "Reminders", icon: Bell },
    { to: "/settings", label: "Settings", icon: Settings2 },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-white bg-slate-800 border border-gray-700 sm:hidden hover:bg-slate-700 transition-colors shadow-lg "
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Slide-Out Menu */}
      <div
        className={`fixed top-1 left-0 h-full w-64 bg-gray-900 text-white z-40 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 shadow-lg border-r border-gray-800 sm:hidden`}
      >
        <div className="p-5">
          <h2 className="text-xl font-bold mb-6 text-blue-400">
            📘 Study Tracker
          </h2>

          <nav className="space-y-4">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-slate-700 ${
                  location.pathname === to
                    ? "bg-slate-800 text-blue-400"
                    : "text-gray-300"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
