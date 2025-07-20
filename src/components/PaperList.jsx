import { useState } from "react";
import papersData from "../data/papers.json";

// Simple ChevronDown icon component
const ChevronDownIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const PaperList = () => {
  const [openSubject, setOpenSubject] = useState(null);

  const toggleSubject = (subjectId) => {
    setOpenSubject(openSubject === subjectId ? null : subjectId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 flex flex-col gap-4 px-4">
      {papersData.map((subject) => (
        <div
          key={subject.id}
          className="bg-[#2d3748] rounded-lg overflow-hidden transition-all duration-300"
        >
          {/* Subject Header */}
          <div
            className="p-4 sm:p-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSubject(subject.id)}
          >
            <span className="text-lg font-medium text-white">
              {subject.subject}
            </span>
            <ChevronDownIcon
              className={`w-6 h-6 text-gray-300 transition-transform duration-300 ${
                openSubject === subject.id ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Expanded Content */}
          {openSubject === subject.id && (
            <div className="px-4 sm:px-6 pb-4 border-t border-gray-600">
              {subject.papers.map((paper, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0"
                >
                  <span className="text-gray-200">{`${paper.year} - ${paper.type}`}</span>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 border border-blue-400 rounded-md px-3 py-1 text-sm font-semibold transition-all duration-200 hover:bg-blue-400 hover:text-[#1a202c]"
                  >
                    View Paper
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaperList;
