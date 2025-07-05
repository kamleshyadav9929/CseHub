// File: src/pages/Analytics.jsx
import syllabus from "../data/syllabus.json";
import { useEffect, useState } from "react";
import { BarChart3, Trophy, BookOpen } from "lucide-react";

export default function Analytics() {
  const [checked, setChecked] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("studyProgress");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  const getSubjectProgress = (subject) => {
    const total = subject.modules.reduce((acc, m) => acc + m.topics.length, 0);
    const completed = subject.modules.reduce(
      (acc, m) =>
        acc + m.topics.filter((t) => checked[`${subject.name}-${t}`]).length,
      0
    );
    return Math.round((completed / total) * 100);
  };

  const allSubjects = syllabus.subjects.map((subject) => ({
    name: subject.name,
    progress: getSubjectProgress(subject),
  }));

  const best = [...allSubjects].sort((a, b) => b.progress - a.progress)[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white px-4 pb-16 pt-10">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BarChart3 className="text-blue-400" /> Analytics Overview
      </h1>

      <div className="mb-6 p-4 rounded-xl bg-slate-800 border border-slate-700">
        <div className="flex items-center gap-2 text-green-400">
          <Trophy />
          <p>
            Your best progress is in <b>{best.name}</b> ({best.progress}%)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {allSubjects.map((sub, i) => (
          <div
            key={i}
            className="p-4 bg-slate-800 border border-slate-700 rounded-xl"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-blue-300 font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-pink-400" />
                {sub.name}
              </h2>
              <span className="text-sm text-gray-400">{sub.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${sub.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
