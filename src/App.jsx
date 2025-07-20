import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Analytics from "./pages/Analytics";
import AssignmentsPage from "./pages/AssignmentsPage";
import DayTrackerApp from "./pages/DayTrackerApp";
import Home from "./pages/Home";
import NotesPage from "./pages/NotesPage";
import PapersPage from "./pages/PapersPage";
import Reminders from "./pages/Reminders";
import Settings from "./pages/Settings";
import SubjectList from "./pages/SubjectList";
import TimetablePage from "./pages/TimetablePage";

// --- New Import ---
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<SubjectList />} />
        <Route path="/day-tracker" element={<DayTrackerApp />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/papers" element={<PapersPage />} />
        <Route path="/notes/:moduleId" element={<NotesPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/timetable" element={<TimetablePage />} />

        {/* --- New Route --- */}
        <Route path="/quiz/:moduleId" element={<QuizPage />} />

        {/* 404 Fallback Route */}
        <Route
          path="*"
          element={<div className="text-white p-10">404 - Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
