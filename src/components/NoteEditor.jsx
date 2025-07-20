import { useEffect, useState } from "react";

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

const NoteEditor = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // If we are editing an existing note, fill the form with its data
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      // Otherwise, ensure the form is clear for a new note
      setTitle("");
      setContent("");
    }
  }, [note]);

  const handleSave = () => {
    if (!title) {
      alert("Please enter a title for the note.");
      return;
    }
    onSave({
      id: note ? note.id : Date.now(), // Use existing id or create a new one
      title,
      content,
    });
  };

  return (
    // This is the modal container
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2d3748] text-white rounded-lg p-6 w-11/12 max-w-2xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {note ? "Edit Note" : "Add New Note"}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <CloseIcon />
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Start writing your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 bg-[#1a202c] rounded-md border border-gray-600 h-64 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Action Buttons */}
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
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
