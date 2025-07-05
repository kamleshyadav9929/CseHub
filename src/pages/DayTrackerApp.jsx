import { useState, useEffect } from "react";
import syllabus from "../data/syllabus.json";
import {
  BookOpen,
  LayoutList,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Trash2,
} from "lucide-react";

const quotes = [
  "Discipline beats motivation. Just start!",
  "Small steps every day lead to big results.",
  "Today’s efforts shape tomorrow’s success.",
  "Stay consistent. Stay unstoppable.",
  "Push yourself because no one else will.",
];

export default function DayTrackerApp() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("dayTasks")) || []
  );
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    localStorage.setItem("dayTasks", JSON.stringify(updated));
  };

  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("dayTasks", JSON.stringify(updated));
  };

  const addTask = (subject, module, topic) => {
    const exists = tasks.find(
      (t) => t.subject === subject && t.module === module && t.topic === topic
    );
    if (!exists) {
      const newTask = { subject, module, topic, done: false };
      const updated = [...tasks, newTask];
      setTasks(updated);
      localStorage.setItem("dayTasks", JSON.stringify(updated));
    }
  };

  const progress = tasks.length
    ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-400 flex items-center justify-center gap-2">
          <CheckCircle className="w-7 h-7" /> Day Tracker
        </h1>
        <p className="text-sm text-gray-400">
          Track your daily study goals with ease
        </p>
        <div className="mt-2 text-white font-bold font-sans italic text-sm h-full w-full bg-gray-800 rounded-2xl p-4">
          "{quote}"
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <h2 className="text-center text-lg font-semibold mb-1">
          Today's Progress: {progress}%
        </h2>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Dropdowns Section */}
      <div className="space-y-6 mb-10">
        {syllabus.subjects.map((subject, sIndex) => {
          const isSubjectOpen = expandedSubject === sIndex;

          return (
            <div
              key={sIndex}
              className="bg-slate-800 border border-slate-700 rounded-2xl shadow-md"
            >
              <div
                onClick={() =>
                  setExpandedSubject(isSubjectOpen ? null : sIndex)
                }
                className="cursor-pointer flex justify-between items-center p-5"
              >
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-300">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    {subject.name}
                  </h2>
                </div>
                {isSubjectOpen ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Modules & Topics */}
              {isSubjectOpen && (
                <div className="px-5 pb-5">
                  {subject.modules.map((module, mIndex) => {
                    const isModuleOpen = expandedModule === mIndex;
                    return (
                      <div key={mIndex} className="mb-4">
                        <div
                          onClick={() =>
                            setExpandedModule(isModuleOpen ? null : mIndex)
                          }
                          className="cursor-pointer bg-slate-700 px-4 py-2 rounded-lg flex justify-between items-center"
                        >
                          <h3 className="text-md font-semibold text-white flex items-center gap-2">
                            <LayoutList className="text-white w-4 h-4" />
                            {module.name}
                          </h3>
                          {isModuleOpen ? <ChevronUp /> : <ChevronDown />}
                        </div>
                        {isModuleOpen && (
                          <ul className="mt-2 space-y-2 ml-4 text-sm">
                            {module.topics.map((topic, tIndex) => (
                              <li
                                key={tIndex}
                                onClick={() =>
                                  addTask(subject.name, module.name, topic)
                                }
                                className="flex items-center gap-2 text-yellow-100 bg-slate-700 px-3 py-2 rounded-lg hover:bg-slate-600 cursor-pointer"
                              >
                                <FileText className="text-yellow-100 w-4 h-4" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Task Container */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg mb-20">
        <h2 className="text-xl font-bold text-white mb-4">📅 Today's Tasks</h2>
        <ul className="space-y-3">
          {tasks.map((task, i) => (
            <li
              key={i}
              className={`flex flex-col md:flex-row md:items-center justify-between gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                task.done
                  ? "bg-green-100 text-green-900"
                  : "bg-red-100 text-red-500"
              }`}
            >
              <div className="text-sm space-y-1 text-gray-950 font-bold">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-red-950" /> {task.subject}
                </div>
                <div className="flex items-center gap-1">
                  <LayoutList className="w-4 h-4 text-slate-950" />{" "}
                  {task.module}
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4 text-gray-950" /> {task.topic}
                </div>
              </div>
              <div className="flex gap-2 text-white font-bold">
                <button
                  onClick={() => toggleDone(i)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.done
                      ? "bg-red-300 text-red-900"
                      : "bg-green-300 text-green-900"
                  }`}
                >
                  {task.done ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => removeTask(i)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="text-sm text-gray-400">
              No tasks yet. Add topics above.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
