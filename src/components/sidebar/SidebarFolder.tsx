"use client";

import { Folder } from "@/models/folder.interface";
import { Folder as FolderIcon, FolderOpen } from "lucide-react";
import { useState } from "react";
import { SidebarItem } from "./SidebarItem";

interface SidebarFolderProps extends Folder {}

export const SidebarFolder = ({ folders, notes, name }: SidebarFolderProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenFolder = () => {
    setOpen(!open);
  };

  return (
    <div className="tab">
      <input
        type="checkbox"
        name="accordion-1"
        id="cb2"
        className="absolute -z-10 opacity-0"
        onChange={handleOpenFolder}
      />
      <label
        className="tab__label flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1 text-xs font-semibold transition-transform hover:bg-neutral-800 active:scale-95"
        htmlFor="cb2"
      >
        {open ? (
          <FolderOpen className="h-4 w-4 text-neutral-500" />
        ) : (
          <FolderIcon className="h-4 w-4 text-neutral-500" />
        )}
        {name}
      </label>
      <ul className="content max-h-0 overflow-hidden transition-all">
        {folders.map((folder) => (
          <li key={folder.id}>
            <SidebarFolder {...folder} />
          </li>
        ))}
        {notes.map((note) => (
          <li key={note.id} className="ml-4 border-l border-neutral-700 pl-2">
            <SidebarItem note={note} />
          </li>
        ))}
      </ul>
    </div>
  );
};
