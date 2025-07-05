// File: src/pages/Settings.jsx
import { useState, useEffect } from "react";
import { Moon, Bell, Trash2, Sun, Settings2 } from "lucide-react";
import HamburgerMenu from "../components/HamburgerMenu";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  // Persist settings
  useEffect(() => {
    const dm = localStorage.getItem("darkMode") === "true";
    const nt = localStorage.getItem("notifications") === "true";
    setDarkMode(dm);
    setNotifications(nt);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("notifications", notifications);
  }, [darkMode, notifications]);

  const clearProgress = () => {
    if (confirm("Are you sure you want to clear all progress?")) {
      localStorage.removeItem("studyProgress");
      alert("Progress cleared!");
    }
  };

  return (
    <div
      className={`min-h-screen px-4 pb-24 pt-16 text-white ${
        darkMode ? "bg-gray-900" : "bg-white text-black"
      }`}
    >
      <HamburgerMenu />
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Settings2 className="text-blue-400" size={28} />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Toggle Dark Mode */}
        <div className="flex justify-between items-center py-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5" />
            <span className="text-sm font-medium">Dark Mode</span>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 relative">
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${
                  darkMode ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
          </label>
        </div>

        {/* Notifications Toggle */}
        <div className="flex justify-between items-center py-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5" />
            <span className="text-sm font-medium">Reminders</span>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative">
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${
                  notifications ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
          </label>
        </div>

        {/* Clear Progress Button */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium">Clear All Progress</span>
          </div>
          <button
            onClick={clearProgress}
            className="text-red-400 border border-red-500 rounded-full px-4 py-1 hover:bg-red-500 hover:text-white transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
