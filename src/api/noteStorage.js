import localforage from 'localforage';

localforage.config({
  name: 'CseHubNotes',
  storeName: 'notes',
});

export const getNotesForModule = async (moduleId) => {
  const allNotes = await localforage.getItem('allNotes') || [];
  return allNotes.filter(note => note.moduleId === moduleId);
};

export const addPdfNote = async (moduleId, file) => {
  const allNotes = await localforage.getItem('allNotes') || [];
  
  // Read the file into a format that can be reliably stored
  const fileBuffer = await file.arrayBuffer();

  const newNote = {
    id: Date.now(),
    moduleId: moduleId,
    type: 'pdf',
    title: file.name,
    // Store the raw data and metadata instead of the file object
    fileData: {
      buffer: fileBuffer,
      name: file.name,
      type: file.type
    },
    lastUpdated: new Date().toISOString(),
  };

  const updatedNotes = [...allNotes, newNote];
  await localforage.setItem('allNotes', updatedNotes);
  return newNote;
};

export const deleteNoteById = async (noteId) => {
    const allNotes = await localforage.getItem('allNotes') || [];
    const updatedNotes = allNotes.filter(note => note.id !== noteId);
    await localforage.setItem('allNotes', updatedNotes);
    return updatedNotes;
};