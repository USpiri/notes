import { create } from "zustand";

// TODO: Maje persistent store

interface EditorState {
  vertical: boolean;
  editable: boolean;
  setVertical: (value: boolean) => void;
  setEditable: (value: boolean) => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  vertical: true,
  editable: true,
  setVertical: (value) => {
    set(() => ({ vertical: value }));
  },
  setEditable: (value) => {
    set(() => ({ editable: value }));
  },
}));
