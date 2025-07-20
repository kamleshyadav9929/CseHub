import { useEffect, useState } from "react";

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

const TimetableForm = ({ onSave, onCancel, classToEdit, day }) => {
  const [formData, setFormData] = useState({
    subject: "",
    location: "",
    startTime: "09:00",
    endTime: "10:00",
    day: day || "Monday",
    color: "#3B82F6",
  });

  useEffect(() => {
    if (classToEdit) {
      setFormData({ ...classToEdit, day });
    }
  }, [classToEdit, day]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.subject || !formData.location) {
      alert("Please fill out all fields.");
      return;
    }
    onSave(formData);
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#2d3748] text-white rounded-lg p-6 w-11/12 max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {classToEdit ? "Edit Class" : "Add New Class"}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="subject"
            placeholder="Subject Name"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g., Room 301)"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {daysOfWeek.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <div className="flex gap-4">
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="color">Class Color:</label>
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-12 h-10 p-1 bg-[#1a202c] rounded-md border-gray-600"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimetableForm;
