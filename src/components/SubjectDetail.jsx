import { motion } from "framer-motion";
import { CheckCheck, NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";

const SubjectDetail = ({ subject, progress, checked, toggleTopic }) => {
  return (
    <motion.div
      key={subject.code}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800/50 p-6 rounded-xl border border-slate-700"
    >
      <h2 className="text-2xl font-bold text-blue-300">{subject.name}</h2>
      <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
        <CheckCheck size={16} />
        {progress}% Completed
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 my-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-6 mt-6">
        {subject.modules.map((mod) => (
          <div key={mod.id}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold text-pink-400">
                {mod.name}
              </h3>
              <Link
                to={`/notes/${mod.id}`}
                className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
              >
                <NotebookPen size={16} />
                Notes
              </Link>
            </div>
            <ul className="space-y-2 text-sm text-gray-200">
              {mod.topics.map((topic, ti) => {
                const key = `${subject.name}-${topic}`;
                return (
                  <li
                    key={ti}
                    className="flex items-start gap-3 bg-slate-800 p-2 rounded-md"
                  >
                    <input
                      type="checkbox"
                      checked={!!checked[key]}
                      onChange={() => toggleTopic(subject.name, topic)}
                      className="mt-1 h-4 w-4 accent-blue-500"
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
    </motion.div>
  );
};

export default SubjectDetail;
