import syllabus from "../data/syllabus.json";
import { useState, useEffect } from "react";
import { BookOpenCheck, CheckCheck, ChevronDown, ChevronUp } from "lucide-react";

export default function SubjectList() {
  const [checked, setChecked] = useState({});
  const [expandedSubject, setExpandedSubject] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("studyProgress");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("studyProgress", JSON.stringify(checked));
  }, [checked]);

  const toggleTopic = (subjectName, topic) => {
    const key = `${subjectName}-${topic}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getSubjectProgress = (subject) => {
    const total = subject.modules.reduce((acc, m) => acc + m.topics.length, 0);
    const completed = subject.modules.reduce(
      (acc, m) =>
        acc + m.topics.filter((t) => checked[`${subject.name}-${t}`]).length,
      0
    );
    return Math.round((completed / total) * 100);
  };

  const toggleExpand = (subjectIndex) => {
    setExpandedSubject((prev) => (prev === subjectIndex ? null : subjectIndex));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white px-4 pb-16">
      <div className="text-center pt-10 mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
          <BookOpenCheck className="w-7 h-7 text-blue-400" />
          CSE Semester {syllabus.semester} Tracker
        </h1>
        <p className="text-sm text-gray-400 mt-1">Your progress is saved automatically</p>
      </div>

      <div className="space-y-6">
        {syllabus.subjects.map((subject, index) => {
          const isExpanded = expandedSubject === index;
          const progress = getSubjectProgress(subject);

          return (
            <div
              key={index}
              className="bg-slate-800 border border-slate-700 rounded-2xl shadow-md"
            >
              {/* Subject Card Header */}
              <div
                onClick={() => toggleExpand(index)}
                className="cursor-pointer flex justify-between items-center p-5"
              >
                <div>
                  <h2 className="text-xl font-semibold text-blue-300">
                    {subject.name}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                    <CheckCheck size={16} />
                    {progress}% Completed
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </div>

              {/* Subject Progress Bar */}
              <div className="px-5">
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Subject Modules */}
              {isExpanded && (
                <div className="px-5 pb-5">
                  {subject.modules.map((mod, mi) => (
                    <div key={mi} className="mb-4">
                      <h3 className="text-md font-semibold text-pink-400 mb-2">
                        {mod.name}
                      </h3>
                      <ul className="pl-4 space-y-2 text-sm text-gray-200">
                        {mod.topics.map((topic, ti) => {
                          const key = `${subject.name}-${topic}`;
                          return (
                            <li key={ti} className="flex items-start gap-2">
                              <input
                                type="checkbox"
                                checked={!!checked[key]}
                                onChange={() => toggleTopic(subject.name, topic)}
                                className="mt-1 accent-blue-500"
                              />
                              <span
                                className={
                                  checked[key] ? "line-through text-gray-500" : ""
                                }
                              >
                                {topic}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
