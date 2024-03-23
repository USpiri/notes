import { CONTENT } from "@/lib/content";
import { create } from "zustand";

interface EditorState {
  content: string;
  vertical: boolean;
  editable: boolean;
  setContent: (content: string) => void;
  setVertical: (value: boolean) => void;
  setEditable: (value: boolean) => void;
}

export const useEditorStore = create<EditorState>()((set) => ({
  vertical: true,
  editable: true,
  content: CONTENT,
  setVertical: (value) => {
    set(() => ({ vertical: value }));
  },
  setEditable: (value) => {
    set(() => ({ editable: value }));
  },
  setContent: (content) => {
    set(() => ({ content }));
  },
}));
