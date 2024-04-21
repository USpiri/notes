"use client";

import { Folder } from "@/models/folder.interface";
import {
  EllipsisVertical,
  Folder as FolderIcon,
  FolderOpen,
} from "lucide-react";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNoteStore } from "@/store/note-store";
import { useDebouncedCallback } from "use-debounce";

interface SidebarFolderProps extends Folder {}

export const SidebarFolder = ({
  folders,
  notes,
  name,
  id,
}: SidebarFolderProps) => {
  const [open, setOpen] = useState(false);
  const deleteFolder = useNoteStore((state) => state.deleteFolder);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(name);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const updateFolderName = useNoteStore((state) => state.updateFodlerName);
  const createNote = useNoteStore((state) => state.createNoteInFolder);
  const createFolder = useNoteStore((state) => state.createFolderInFolder);

  const handleOpenFolder = useDebouncedCallback(() => {
    if (isEditing) return;
    setOpen(!open);
  }, 150);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current!.select();
    }, 10);
  };

  const handleChangeName = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current!.select();
    }, 200);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text.length > 0) {
      console.log("Update Folder", text);
      updateFolderName(id, text);
    } else {
      setText(name);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      event.preventDefault();
      event.stopPropagation();
      if (text.length > 0) {
        console.log("Update folder after enter key", text);
        updateFolderName(id, text);
      } else {
        setText(name);
      }
    }
  };

  const handleNewNote = () => {
    setOpen(true);
    createNote(id);
  };

  const handleNewFolder = () => {
    setOpen(true);
    createFolder(id);
  };

  return (
    <div className="tab">
      <div className="tab-header flex h-auto flex-row rounded hover:bg-neutral-800">
        <>
          <input
            type="checkbox"
            name="accordion-1"
            id={`cb-${id}`}
            className="absolute -z-10 opacity-0"
            onChange={handleOpenFolder}
            checked={open}
          />
          <label
            className="flex flex-1 cursor-pointer select-none items-center gap-2 px-2 py-1 text-xs font-semibold transition-transform active:scale-95"
            htmlFor={`cb-${id}`}
          >
            {open ? (
              <FolderOpen className="h-4 w-4 text-neutral-500" />
            ) : (
              <FolderIcon className="h-4 w-4 text-neutral-500" />
            )}
            {isEditing ? (
              <input
                autoFocus
                type="text"
                ref={inputRef}
                value={text}
                className="bg-transparent focus:outline-none"
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span onDoubleClick={handleDoubleClick}>{name}</span>
            )}
          </label>
        </>
        <DropdownMenu>
          <DropdownMenuTrigger className="m-0.5 rounded p-0.5 hover:bg-neutral-700/50">
            <EllipsisVertical className="h-4 w-4 text-neutral-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DropdownMenuItem asChild>
              <button onClick={handleNewNote}>
                <span className="text-xs">Create note</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button onClick={handleNewFolder}>
                <span className="text-xs">Create folder</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button onClick={handleChangeName}>
                <span className="text-xs">Change name</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button onClick={() => deleteFolder(id)}>
                <span className="text-xs">Delete</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {(folders.length > 0 || notes.length > 0) && (
        <ul
          className={cn(
            "content max-h-0 overflow-hidden transition-all *:py-0.5",
            open && "pt-1",
          )}
        >
          {folders.map((folder) => (
            <li
              key={folder.id}
              className="ml-4 border-l border-neutral-700 pl-2"
            >
              <SidebarFolder {...folder} />
            </li>
          ))}
          {notes.map((note) => (
            <li key={note.id} className="ml-4 border-l border-neutral-700 pl-2">
              <SidebarItem note={note} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
