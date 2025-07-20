import { File, FileText, PlusCircle, Trash2, Upload } from "lucide-react";

const NoteSidebar = ({
  notes,
  onSelectNote,
  activeNoteId,
  onAddNew,
  onUpload,
  onDelete,
}) => {
  return (
    <div className="bg-slate-800/50 border-r border-slate-700 h-full flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-white">Module Notes</h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className={`flex items-center group ${
                activeNoteId === note.id ? "bg-blue-600" : "hover:bg-slate-700"
              }`}
            >
              <button
                onClick={() => onSelectNote(note)}
                className="flex-grow text-left p-4 flex items-center gap-3 transition-colors"
              >
                {note.type === "pdf" ? (
                  <File className="text-red-400 flex-shrink-0" />
                ) : (
                  <FileText className="text-blue-400 flex-shrink-0" />
                )}
                <span className="flex-grow text-white truncate">
                  {note.title}
                </span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}
                className="p-2 mr-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Note"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="p-4 text-sm text-slate-400">
            No notes yet. Start by uploading a PDF.
          </p>
        )}
      </div>
      <div className="p-2 border-t border-slate-700 flex gap-2">
        <button
          onClick={onAddNew}
          className="flex-1 p-2 flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle size={18} /> New Note
        </button>
        <button
          onClick={onUpload}
          className="flex-1 p-2 flex items-center justify-center gap-2 rounded-md bg-slate-600 hover:bg-slate-500"
        >
          <Upload size={18} /> Upload PDF
        </button>
      </div>
    </div>
  );
};

export default NoteSidebar;
