import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SubjectList from "./pages/SubjectList";
import DayTrackerApp from "./pages/DayTrackerApp";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Reminders from "./pages/Reminders";

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
        <Route
          path="*"
          element={<div className="text-white p-10">404 - Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
