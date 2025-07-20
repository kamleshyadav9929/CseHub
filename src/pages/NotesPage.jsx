import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  addPdfNote,
  deleteNoteById,
  getNotesForModule,
} from "../api/noteStorage";
import NoteContentViewer from "../components/NoteContentViewer";
import NoteSidebar from "../components/NoteSidebar";
import syllabusData from "../data/syllabus.json";

const NotesPage = () => {
  const { moduleId } = useParams();
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const fileInputRef = useRef(null);

  const moduleInfo = syllabusData.subjects
    .flatMap((subject) => subject.modules)
    .find((module) => module.id === moduleId);

  const loadNotes = async () => {
    const moduleNotes = await getNotesForModule(moduleId);
    setNotes(moduleNotes);
  };

  useEffect(() => {
    loadNotes();
    setActiveNote(null);
  }, [moduleId]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      await addPdfNote(moduleId, file);
      loadNotes(); // Reload notes to show the new one
      event.target.value = null; // Reset file input
    } else {
      alert("Please select a PDF file.");
    }
  };

  const handleDelete = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await deleteNoteById(noteId);
      // If the deleted note was the active one, clear the viewer
      if (activeNote && activeNote.id === noteId) {
        setActiveNote(null);
      }
      loadNotes(); // Reload notes to reflect the deletion
    }
  };

  return (
    <div className="w-full h-screen bg-[#1a202c] text-white flex flex-col">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-blue-400 hover:underline"
        >
          <ArrowLeft size={18} /> Back
        </Link>
        <h1 className="text-lg md:text-xl font-bold text-center">
          {moduleInfo ? moduleInfo.name : "Notes"}
        </h1>
        <div className="w-16"></div>
      </div>
      <div className="flex-grow flex overflow-hidden">
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
          <NoteSidebar
            notes={notes}
            activeNoteId={activeNote?.id}
            onSelectNote={setActiveNote}
            onAddNew={() => alert("Text note editor coming soon!")}
            onUpload={handleUploadClick}
            onDelete={handleDelete}
          />
        </div>

        <div className="hidden md:block flex-grow">
          <NoteContentViewer note={activeNote} />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default NotesPage;
