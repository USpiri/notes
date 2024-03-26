import { create } from "zustand";

// TODO: Maje persistent store

interface ConfigState {
  content: string;
  vertical: boolean;
  editable: boolean;
  openMenu: boolean;
  setContent: (content: string) => void;
  setVertical: (value: boolean) => void;
  setEditable: (value: boolean) => void;
  toggleMenu: (value?: boolean) => void;
}

export const useConfigStore = create<ConfigState>()((set) => ({
  content: "",
  vertical: true,
  editable: true,
  openMenu: false,
  setContent: (content) => set(() => ({ content })),
  setVertical: (value) => {
    set(() => ({ vertical: value }));
  },
  setEditable: (value) => {
    set(() => ({ editable: value }));
  },
  toggleMenu: (value) => {
    set((state) => ({ openMenu: value ?? !state.openMenu }));
  },
}));
