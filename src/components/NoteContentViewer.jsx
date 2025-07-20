import { FileQuestion } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const NoteContentViewer = ({ note }) => {
  const [numPages, setNumPages] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    // Reconstruct the file from raw data before creating a URL
    if (note && note.type === "pdf" && note.fileData) {
      const blob = new Blob([note.fileData.buffer], {
        type: note.fileData.type,
      });
      const url = URL.createObjectURL(blob);
      setFileUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [note]);

  if (!note) {
    return (
      <div className="h-full flex flex-col justify-center items-center text-slate-500 p-8 text-center">
        <FileQuestion size={64} />
        <h2 className="mt-4 text-xl font-semibold">Select a note</h2>
        <p>Choose or upload a note to view its content.</p>
      </div>
    );
  }
  // ... (The rest of the component is the same)
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 pb-4 border-b border-slate-700">
        {note.title}
      </h1>
      {note.type === "pdf" && fileUrl ? (
        <div className="bg-white rounded-lg overflow-hidden">
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages || 0), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      ) : (
        <div className="prose prose-invert max-w-none text-slate-200 whitespace-pre-wrap">
          {note.content}
        </div>
      )}
    </div>
  );
};

export default NoteContentViewer;
