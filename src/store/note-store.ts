import { CONTENT } from "@/lib/content";
import { Folder } from "@/models/folder.interface";
import { Note } from "@/models/note.interface";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteState {
  root: Folder;
  selectedNote: Note | null;
  createNote: () => void;
  updateNote: (id: string, note: Note) => void;
  setSelectedNote: (note: Note) => void;
}

const noteState: StateCreator<NoteState> = (set) => ({
  root: {
    id: "root",
    name: "Root",
    notes: [
      {
        id: "123",
        title: "Custom Editor",
        content: CONTENT,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    folders: [],
  },
  selectedNote: {
    id: "123",
    title: "Custom Editor",
    content: CONTENT,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  createNote: () =>
    set((state) => ({
      root: { ...state.root, notes: [...state.root.notes, createNewNote()] },
    })),
  setSelectedNote: (note) => set(() => ({ selectedNote: note })),
  updateNote: (id, note) => {
    set((state) => {
      const updatedRoot = updateNoteInFolders(id, note, state.root);
      return {
        root: updatedRoot,
      };
    });
  },
});

export const useNoteStore = create<NoteState>()(
  persist(noteState, { name: "note-store" }),
);

const findNoteById = (id: string, folder: Folder): Note | null => {
  const note = folder.notes.find((note) => note.id === id);
  if (note) return note;
  for (const subfolder of folder.folders) {
    const note = findNoteById(id, subfolder);
    if (note) return note;
  }
  return null;
};

const updateNoteInFolders = (
  id: string,
  note: Note,
  folder: Folder,
): Folder => {
  const updatedNotes = folder.notes.map((n) => (n.id === id ? note : n));

  if (updatedNotes.some((n) => n.id === id)) {
    return { ...folder, notes: updatedNotes };
  }

  const updatedFolders = folder.folders.map((sub) =>
    updateNoteInFolders(id, note, sub),
  );
  return {
    ...folder,
    notes: updatedNotes,
    folders: updatedFolders,
  };
};

const deleteNoteInFolders = (
  id: string,
  note: Note,
  folder: Folder,
): Folder => {
  const filteredNotes = folder.notes.map((n) => (n.id === id ? note : n));

  const filteredFolders = folder.folders.map((sub) =>
    deleteNoteInFolders(id, note, sub),
  );
  return {
    ...folder,
    notes: filteredNotes,
    folders: filteredFolders,
  };
};

const createNewNote = (): Note => ({
  id: generateUUID(),
  title: "New note",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
});

const generateUUID = () => {
  return (
    Date.now().toString(36) + Math.random().toString(36).substring(2, 5)
  ).toUpperCase();
};
