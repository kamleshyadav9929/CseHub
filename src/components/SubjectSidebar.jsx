import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SubjectSidebar = ({
  subjects,
  progress,
  activeSubject,
  setActiveSubject,
}) => {
  return (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
      <h2 className="text-lg font-semibold mb-4 text-white">Subjects</h2>
      <div className="space-y-2">
        {subjects.map((subject, index) => {
          const isActive = activeSubject.name === subject.name;
          return (
            <button
              key={subject.code}
              onClick={() => setActiveSubject(subject)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-colors ${
                isActive ? "bg-blue-600" : "hover:bg-slate-700"
              }`}
            >
              <div style={{ width: 40, height: 40 }}>
                <CircularProgressbar
                  value={progress[subject.name] || 0}
                  text={`${progress[subject.name] || 0}%`}
                  styles={buildStyles({
                    textColor: isActive ? "#fff" : "#cbd5e1",
                    pathColor: isActive ? "#fff" : "#3b82f6",
                    trailColor: "rgba(255, 255, 255, 0.1)",
                    textSize: "28px",
                  })}
                />
              </div>
              <span className="font-medium text-white">{subject.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectSidebar;
