import { Note } from "@/models/note.interface";
import { useNoteStore } from "@/store/note-store";
import { FileText } from "lucide-react";
import React from "react";

interface SidebarItemProps {
  note: Note;
}

export const SidebarItem = ({ note }: SidebarItemProps) => {
  const { setSelectedNote } = useNoteStore((state) => ({
    setSelectedNote: state.setSelectedNote,
  }));

  const handleItemClick = () => {
    setSelectedNote(note);
  };

  return (
    <button
      className="flex w-full items-center gap-2 rounded px-2 py-1 transition-all hover:bg-neutral-800 active:scale-95"
      onClick={handleItemClick}
    >
      <FileText className="h-4 w-4 text-neutral-500" />
      <div className="text-xs font-semibold">{note.title}</div>
    </button>
  );
};
