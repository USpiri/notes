"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FolderPlus, Menu, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import "./sidebar.css";
import { ConfigDialog } from "../config-dialog/ConfigDialog";
import { Folder } from "@/models/folder.interface";
import { CONTENT, CONTENT2 } from "@/lib/content";
import { SidebarItem } from "./SidebarItem";
import { useEditorStore } from "@/store/configStore";
import { SidebarFolder } from "./SidebarFolder";
import { Separator } from "../ui/separator";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const folder: Folder = {
    id: "123",
    name: "Root",
    folders: [
      {
        id: "127",
        name: "Folder",
        folders: [],
        notes: [
          {
            id: "128",
            title: "Folder Index",
            content: CONTENT,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "129",
            title: "Oter note inside folder",
            content: CONTENT2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ],
    notes: [
      {
        id: "124",
        title: "Index",
        content: CONTENT,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "125",
        title: "Oter note",
        content: CONTENT2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  const { setContent } = useEditorStore((state) => ({
    setContent: state.setContent,
  }));

  const handleItemClick = (content: string) => {
    setContent(content);
  };

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
            <Button variant="outline" size="icon" className="h-7 w-7">
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
                <SidebarItem
                  onClick={() => handleItemClick(note.content)}
                  label={note.title}
                />
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
