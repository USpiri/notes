import { create } from "zustand";

// TODO: Maje persistent store

interface EditorState {
  content: string;
  vertical: boolean;
  editable: boolean;
  setContent: (content: string) => void;
  setVertical: (value: boolean) => void;
  setEditable: (value: boolean) => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  content: "",
  vertical: true,
  editable: true,
  setContent: (content) => set(() => ({ content })),
  setVertical: (value) => {
    set(() => ({ vertical: value }));
  },
  setEditable: (value) => {
    set(() => ({ editable: value }));
  },
}));
