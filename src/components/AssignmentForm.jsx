import { useState } from "react";
import syllabusData from "../data/syllabus.json";

// CloseIcon component for the modal
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const AssignmentForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(syllabusData.subjects[0]?.name || "");
  const [dueDate, setDueDate] = useState("");

  const handleSave = () => {
    if (!title || !subject || !dueDate) {
      alert("Please fill out all fields.");
      return;
    }
    onSave({ title, subject, dueDate });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#2d3748] text-white rounded-lg p-6 w-11/12 max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Assignment</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {syllabusData.subjects.map((s) => (
              <option key={s.code} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
          >
            Save Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentForm;
