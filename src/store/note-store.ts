import { CONTENT } from "@/lib/content";
import { Folder } from "@/models/folder.interface";
import { Note } from "@/models/note.interface";
import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface NoteState {
  root: Folder;
  selectedNote?: Note;
  createNote: () => void;
  createFolder: () => void;
  createNoteInFolder: (id: string) => void;
  createFolderInFolder: (id: string) => void;
  updateNote: (id: string, note: Note) => void;
  updateFodlerName: (id: string, name: string) => void;
  deleteNote: (id: string) => void;
  deleteFolder: (id: string) => void;
  setSelectedNote: (note: Note) => void;
}

const defaultNote = {
  id: "123",
  title: "Custom Editor",
  content: CONTENT,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const noteState: StateCreator<NoteState> = (set) => ({
  root: {
    id: "root",
    name: "Root",
    notes: [defaultNote],
    folders: [],
  },
  selectedNote: defaultNote,

  createNote: () =>
    set((state) => ({
      root: { ...state.root, notes: [...state.root.notes, createNewNote()] },
    })),
  createFolder: () =>
    set((state) => ({
      root: {
        ...state.root,
        folders: [...state.root.folders, createNewFolder()],
      },
    })),
  createNoteInFolder: (id) => {
    set((state) => {
      const updatedRoot = newNoteInFolder(id, state.root);
      return { root: updatedRoot };
    });
  },
  createFolderInFolder: (id) => {
    set((state) => {
      const updatedRoot = newFolderInFolder(id, state.root);
      return { root: updatedRoot };
    });
  },

  setSelectedNote: (note) => set(() => ({ selectedNote: note })),
  updateNote: (id, note) => {
    set((state) => {
      const updatedRoot = updateNoteInFolders(id, note, state.root);
      return {
        root: updatedRoot,
      };
    });
  },
  updateFodlerName: (id, name) => {
    set((state) => {
      const updatedRoot = updatedFolderInFolders(id, name, state.root);
      return {
        root: updatedRoot,
      };
    });
  },
  deleteNote: (id) => {
    set((state) => {
      const updatedRoot = deleteNoteInFolders(id, state.root);
      const newSelectedNote =
        state.selectedNote?.id === id ? defaultNote : state.selectedNote;
      return {
        root: updatedRoot,
        selectedNote: newSelectedNote,
      };
    });
  },
  deleteFolder: (id) => {
    set((state) => {
      const updatedRoot = deleteFolderInFolders(id, state.root);
      const newSelectedNote =
        findNoteById(state.selectedNote?.id!, state.root) === null
          ? defaultNote
          : state.selectedNote;
      return {
        root: updatedRoot,
        selectedNote: newSelectedNote,
      };
    });
  },
});

export const useNoteStore = create<NoteState>()(
  devtools(persist(noteState, { name: "note-store" })),
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

const deleteNoteInFolders = (id: string, folder: Folder): Folder => {
  const filteredNotes = folder.notes.filter((n) => n.id !== id);
  if (filteredNotes.length < folder.notes.length) {
    return {
      ...folder,
      notes: filteredNotes,
    };
  }
  const filteredFolders = folder.folders.map((sub) =>
    deleteNoteInFolders(id, sub),
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

const newNoteInFolder = (id: string, folder: Folder): Folder => {
  const note = createNewNote();
  const updatedFolders = folder.folders.map((f) =>
    f.id === id ? { ...f, notes: [...f.notes, note] } : f,
  );

  if (updatedFolders.some((f) => f.id === id)) {
    return { ...folder, folders: updatedFolders };
  } else {
    const updatedSubFolders = updatedFolders.map((f) => newNoteInFolder(id, f));
    return { ...folder, folders: updatedSubFolders };
  }
};

const createNewFolder = (): Folder => ({
  id: generateUUID(),
  name: "New folder",
  notes: [],
  folders: [],
});

const newFolderInFolder = (id: string, folder: Folder): Folder => {
  const newFolder = createNewFolder();
  const updatedFolders = folder.folders.map((f) =>
    f.id === id ? { ...f, folders: [...f.folders, newFolder] } : f,
  );

  if (updatedFolders.some((f) => f.id === id)) {
    return { ...folder, folders: updatedFolders };
  } else {
    const updatedSubFolders = updatedFolders.map((f) =>
      newFolderInFolder(id, f),
    );
    return { ...folder, folders: updatedSubFolders };
  }
};

const updatedFolderInFolders = (
  id: string,
  name: string,
  folder: Folder,
): Folder => {
  const updatedFolders = folder.folders.map((f) =>
    f.id === id ? { ...f, name } : f,
  );

  if (updatedFolders.some((f) => f.id === id)) {
    return { ...folder, folders: updatedFolders };
  } else {
    const updatedSubFolders = updatedFolders.map((f) =>
      updatedFolderInFolders(id, name, f),
    );
    return { ...folder, folders: updatedSubFolders };
  }
};

const deleteFolderInFolders = (id: string, folder: Folder): Folder => {
  const filteredFolders = folder.folders.filter((f) => f.id !== id);
  if (filteredFolders.length < folder.folders.length) {
    return { ...folder, folders: filteredFolders };
  } else {
    const updatedFolders = filteredFolders.map((sub) =>
      deleteFolderInFolders(id, sub),
    );
    return {
      ...folder,
      folders: updatedFolders,
    };
  }
};

const generateUUID = () => {
  return (
    Date.now().toString(36) + Math.random().toString(36).substring(2, 5)
  ).toUpperCase();
};
