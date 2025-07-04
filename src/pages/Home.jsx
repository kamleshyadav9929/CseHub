import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import hero from "../assets/hero.jpg";

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-8">
      {/* Header */}
      <header className="flex items-center gap-3 mb-10">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-12 rounded-full border border-blue-400"
        />
        <h1 className="text-2xl font-bold">CSE Study Tracker</h1>
      </header>

      {/* Main */}
      <main className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl w-full gap-10">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-sans">
            Track Your Semester Subjects
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto md:mx-0">
            Stay organized and track your subject progress with ease. Click
            below to start marking topics as complete and boost your study
            planning.
          </p>
          <button
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full text-white font-semibold"
          >
            Start Tracking
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={hero}
            alt="Hero"
            className="w-full max-w-xs sm:max-w-md rounded-lg shadow-lg"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-400 text-center">
        Made with ❤️ for BIT Patna CSE Students
      </footer>
    </div>
  );
}
