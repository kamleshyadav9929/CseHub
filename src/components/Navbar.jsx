import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaCalendarDay,
  FaBell,
  FaCog,
} from "react-icons/fa";

const links = [
  { path: "/", label: "Home", icon: <FaHome /> },
  { path: "/day-tracker", label: "Tracker", icon: <FaCalendarDay /> },
  { path: "/analytics", label: "Analytics", icon: <FaChartBar /> },
  { path: "/reminders", label: "Reminders", icon: <FaBell /> },
  { path: "/settings", label: "Settings", icon: <FaCog /> },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 md:top-0 md:left-0 md:h-screen md:w-20 w-full flex md:flex-col bg-gray-900 border-t md:border-t-0 md:border-r border-gray-800 z-50">
      {links.map((link, idx) => (
        <NavLink
          to={link.path}
          key={idx}
          className={({ isActive }) =>
            `flex-1 md:flex-none md:w-full flex items-center justify-center py-3 md:py-6 text-sm text-gray-400 hover:text-white transition ${
              isActive ? "text-blue-400" : ""
            }`
          }
        >
          <div className="flex flex-col items-center space-y-1">
            <span className="text-lg">{link.icon}</span>
            <span className="text-xs md:text-[10px]">{link.label}</span>
          </div>
        </NavLink>
      ))}
    </nav>
  );
}
