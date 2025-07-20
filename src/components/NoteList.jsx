// Simple icons for the buttons
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 0 0-2.09 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        <p>No notes for this module yet.</p>
        <p>Click "Add New Note" to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-[#2d3748] rounded-lg p-4 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-white font-bold text-lg mb-2">{note.title}</h3>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">
              {note.content.substring(0, 150)}
              {note.content.length > 150 ? "..." : ""}
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => onEdit(note)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className="p-2 text-red-400 hover:text-red-300 transition-colors"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
