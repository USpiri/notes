import { MAIN } from "@/lib/content";
import { Folder } from "@/models/folder.interface";
import { TreeNode } from "@/models/node.interface";
import { Note } from "@/models/note.interface";
import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface NoteState {
  root?: any;
  folders: TreeNode[];
  notes: Note[];

  createNote: (parent?: string) => void;
  updateNote: (id: string, note: Note) => void;
  deleteNote: (id: string) => void;

  createFolder: (parent?: string) => void;
  updateFolder: (id: string, text: string) => void;
  updateFolders: (folders: TreeNode[]) => void;
  deleteFolder: (id: string) => void;
}

const defaultNote = {
  id: "U18DIC224RG",
  content: MAIN,
};

const defaultFolder: TreeNode = {
  id: "U18DIC224RG",
  text: "My Notes",
  parent: "root",
};

const noteState: StateCreator<NoteState> = (set) => ({
  folders: [defaultFolder],
  notes: [defaultNote],

  createNote: (parent?: string) => {
    const note = newNote();
    const folder: TreeNode = {
      id: note.id,
      parent: parent ?? "root",
      text: "New note",
    };
    set((state) => ({
      notes: [...state.notes, note],
      folders: [...state.folders, folder],
    }));
  },

  createFolder: (parent?: string) =>
    set((state) => ({
      folders: [...state.folders, newFolder(parent, true)],
    })),

  updateNote: (id, note) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? note : n)),
    })),

  updateFolder: (id, text) =>
    set((state) => ({
      folders: [
        ...state.folders.map((f) => (f.id === id ? { ...f, text } : f)),
      ],
    })),

  updateFolders: (folders) =>
    set(() => ({
      folders: [...folders],
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      folders: state.folders.filter((f) => f.id !== id),
    })),

  deleteFolder: (id) =>
    set((state) => {
      const deletionList = getDeletionList(state.folders, id);
      return {
        folders: state.folders.filter((f) => !deletionList.includes(f.id)),
        notes: state.notes.filter((n) => !deletionList.includes(n.id)),
      };
    }),
});

const flatRoot = (root: Folder): TreeNode[] => {
  return [
    ...flatFolders(root.folders, "root"),
    ...parseNotesToTreeNode(root.notes, "root"),
  ];
};

const flatRootNotes = (root: Folder): Note[] => {
  const notes = root.notes.map(({ id, content }) => ({ id, content }));
  return [...notes, ...getNotesfromFolder(root.folders)];
};

const getNotesfromFolder = (folders: Folder[]): Note[] => {
  return folders.flatMap((f) => {
    const notes = f.notes.map(({ id, content }) => ({ id, content }));
    return [...notes, ...getNotesfromFolder(f.folders)];
  });
};

const parseNotesToTreeNode = (notes: Note[], parent: string): TreeNode[] => {
  return notes.map((n) => ({
    id: n.id,
    parent,
    text: n.title ?? "New note",
  }));
};

const flatFolders = (folders: Folder[], parent: string): TreeNode[] => {
  return folders.flatMap((f) => {
    return [
      {
        id: f.id,
        parent,
        droppable: true,
        text: f.name ?? "New folder",
      },
      ...flatFolders(f.folders, f.id),
      ...parseNotesToTreeNode(f.notes, f.id),
    ];
  });
};

export const useNoteStore = create<NoteState>()(
  devtools(
    persist(noteState, {
      name: "note-store",
      version: 1,
      migrate(persistedStateUnknown, version) {
        const persistedState = persistedStateUnknown as NoteState;

        if (version === 0) {
          const folders = flatRoot(persistedState.root!);
          const notes = flatRootNotes(persistedState.root!);
          persistedState.folders = folders;
          persistedState.notes = notes;
          delete persistedState.root;
        }

        return persistedState;
      },
    }),
  ),
);

const getDeletionList = (nodes: TreeNode[], id: string): string[] => {
  const childs = findChilds(nodes, id);
  return [id, ...childs.map((n) => n.id)];
};

const findChilds = (nodes: TreeNode[], id: string) => {
  let childs: TreeNode[] = [];
  nodes.forEach((n) => {
    if (n.parent === id) {
      childs.push(n);
      childs = [...childs, ...findChilds(nodes, n.id)];
    }
  });
  return childs;
};

const newNote = (): Note => ({
  id: generateUUID(),
  content: "",
});

const newFolder = (
  parent?: string,
  droppable?: boolean,
  text?: string,
): TreeNode => ({
  id: generateUUID(),
  parent: parent ?? "root",
  droppable,
  text: droppable ? text ?? "New folder" : text ?? "New note",
});

const generateUUID = () => {
  return (
    Date.now().toString(36) + Math.random().toString(36).substring(2, 5)
  ).toUpperCase();
};
