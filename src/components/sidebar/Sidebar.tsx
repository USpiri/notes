"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FolderPlus, Menu, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import "./sidebar.css";
import { ConfigDialog } from "../config-dialog/ConfigDialog";
import { SidebarItem } from "./SidebarItem";
import { SidebarFolder } from "./SidebarFolder";
import { Separator } from "../ui/separator";
import { useNoteStore } from "@/store/note-store";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const { folder } = useNoteStore((state) => ({
    folder: state.root,
  }));

  const createNote = useNoteStore((state) => state.createNote);

  return (
    <aside className="fixed z-20 bg-neutral-950 sm:relative sm:flex">
      <div
        className={cn(
          "sidebar sticky top-0 h-screen overflow-hidden border-r bg-neutral-950",
          open && "open",
        )}
      >
        <div className="flex w-screen flex-col gap-2 px-2 py-5 sm:w-64">
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={createNote}
            >
              <SquarePen className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="h-7 w-7">
              <FolderPlus className="h-3.5 w-3.5" />
            </Button>
            <ConfigDialog />
          </div>
          <Separator />
          <ul className="flex flex-col gap-1">
            {folder.folders.map((folder) => (
              <li key={folder.id}>
                <SidebarFolder {...folder} />
              </li>
            ))}
            {folder.notes.map((note) => (
              <li key={note.id}>
                <SidebarItem note={note} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="fixed bottom-5 right-5 z-30 ml-4 flex flex-col gap-2 transition-transform sm:bottom-[unset] sm:right-[unset] sm:top-5 sm:flex-row">
          <Button onClick={() => setOpen(!open)} variant="outline" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </aside>
  );
};
