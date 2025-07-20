import { BookOpenCheck } from "lucide-react";
import { useEffect, useState } from "react";
import syllabus from "../data/syllabus.json";
// --- THE FIX IS HERE: Corrected import paths to match your folder structure ---
import SubjectDetail from "../components/SubjectDetail";
import SubjectSidebar from "../components/SubjectSidebar";

export default function SubjectList() {
  const [checked, setChecked] = useState({});
  const [progress, setProgress] = useState({});
  const [activeSubject, setActiveSubject] = useState(
    syllabus.subjects.find((s) => s.type === "Theory")
  );

  useEffect(() => {
    const saved = localStorage.getItem("studyProgress");
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("studyProgress", JSON.stringify(checked));

    const newProgress = {};
    syllabus.subjects.forEach((subject) => {
      if (subject.type === "Theory") {
        const total = subject.modules.reduce(
          (acc, m) => acc + m.topics.length,
          0
        );
        if (total === 0) {
          newProgress[subject.name] = 0;
          return;
        }
        const completed = subject.modules.reduce(
          (acc, m) =>
            acc +
            m.topics.filter((t) => checked[`${subject.name}-${t}`]).length,
          0
        );
        newProgress[subject.name] = Math.round((completed / total) * 100);
      }
    });
    setProgress(newProgress);
  }, [checked]);

  const toggleTopic = (subjectName, topic) => {
    const key = `${subjectName}-${topic}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const theorySubjects = syllabus.subjects.filter((s) => s.type === "Theory");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white px-4 md:px-8 py-8">
      <div className="text-center pt-10 mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
          <BookOpenCheck className="w-7 h-7 text-blue-400" />
          CSE Semester {syllabus.semester} Tracker
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Select a subject from the sidebar to view its modules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-1">
          <SubjectSidebar
            subjects={theorySubjects}
            progress={progress}
            activeSubject={activeSubject}
            setActiveSubject={setActiveSubject}
          />
        </div>

        <div className="lg:col-span-3">
          {activeSubject && (
            <SubjectDetail
              subject={activeSubject}
              progress={progress[activeSubject.name] || 0}
              checked={checked}
              toggleTopic={toggleTopic}
            />
          )}
        </div>
      </div>
    </div>
  );
}
