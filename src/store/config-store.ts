import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigState {
  vertical: boolean;
  editable: boolean;
  openMenu: boolean;
  setVertical: (value: boolean) => void;
  setEditable: (value: boolean) => void;
  toggleMenu: (value?: boolean) => void;
}

const configState: StateCreator<ConfigState> = (set) => ({
  vertical: true,
  editable: true,
  openMenu: true,
  setVertical: (value) => {
    set(() => ({ vertical: value }));
  },
  setEditable: (value) => {
    set(() => ({ editable: value }));
  },
  toggleMenu: (value) => {
    set((state) => ({ openMenu: value ?? !state.openMenu }));
  },
});

export const useConfigStore = create<ConfigState>()(
  persist(configState, { name: "config-store" }),
);
