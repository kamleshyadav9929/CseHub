import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BrainCircuit,
  Calendar,
  CalendarDays,
  ClipboardList,
  FileText,
  Settings,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  // 2. Add the AI Quiz Generator to the features array
  const features = [
    {
      label: "Syllabus Tracker",
      icon: <BookOpenCheck />,
      path: "/dashboard",
      description:
        "Visualize and track your progress through every subject and module.",
    },
    {
      label: "Past Papers",
      icon: <FileText />,
      path: "/papers",
      description:
        "Access a centralized archive of previous year question papers.",
    },
    {
      label: "Assignment Hub",
      icon: <ClipboardList />,
      path: "/assignments",
      description:
        "Never miss a deadline. Add and manage all your assignments.",
    },
    {
      label: "Timetable",
      icon: <Calendar />,
      path: "/timetable",
      description:
        "View and manage your weekly class schedule in a customizable grid.",
    },
    {
      label: "AI Quiz Generator", // <-- New Link
      icon: <BrainCircuit />,
      path: "/dashboard", // <-- Directs to dashboard to select a module first
      description:
        "Test your knowledge with quizzes generated from your own notes.",
    },
    {
      label: "Analytics",
      icon: <BarChart3 />,
      path: "/analytics",
      description:
        "Get insights into your study patterns and subject performance.",
    },
    {
      label: "Day Tracker",
      icon: <CalendarDays />,
      path: "/day-tracker",
      description:
        "Plan your study sessions and manage your daily schedule efficiently.",
    },
    {
      label: "Settings",
      icon: <Settings />,
      path: "/settings",
      description: "Customize the app, manage your data, and set preferences.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-24 sm:pt-32">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              Your Smart Companion for Academic Success
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-lg mx-auto md:mx-0">
              Track your syllabus, manage deadlines, and access study
              materials—all in one place. Stop juggling and start learning
              smarter.
            </p>
            <div className="mt-8 flex gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105 flex items-center gap-2"
              >
                Go to Dashboard
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Side: Hero Image */}
          <div className="md:w/1/2 flex justify-center">
            <img
              src={hero}
              alt="Study Tracker Hero"
              className="w-full max-w-md rounded-2xl shadow-2xl shadow-blue-500/20"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-24 sm:mt-32 py-16 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              A Powerful Toolkit for Every Student
            </h2>
            <p className="mt-4 text-slate-300">
              Everything you need to stay organized and excel in your semester.
            </p>
            {/* 3. Update grid classes for 8 items */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  onClick={() => navigate(feature.path)}
                  className="bg-slate-800 p-6 rounded-xl border border-slate-700 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:scale-105"
                >
                  <div className="text-blue-400 w-fit mx-auto mb-4">
                    {React.cloneElement(feature.icon, { size: 32 })}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400">
        Made with ❤️ for BIT Patna CSE Students
      </footer>
    </div>
  );
}
