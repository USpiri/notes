import { ReactNode, useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useNoteStore } from "@/store/note-store";
import { Copy, FileText, Folder, LucideIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarContextMenuProps {
  id: string;
  parentId?: string;
  isFolder: boolean;
  className?: string;
  children: ReactNode;
}

export const SidebarContextMenu = ({
  id,
  parentId = "root",
  isFolder,
  children,
  className,
}: SidebarContextMenuProps) => {
  const [selected, setSelected] = useState(false);
  const { createNote, createFolder, deleteFolder, deleteNote, copyNote } =
    useNoteStore((s) => ({
      createNote: s.createNote,
      createFolder: s.createFolder,
      deleteFolder: s.deleteFolder,
      deleteNote: s.deleteNote,
      copyNote: s.copyNote,
    }));

  return (
    <ContextMenu onOpenChange={() => setSelected(!selected)}>
      <ContextMenuTrigger className={className}>
        <div
          className={cn(selected && id !== "root" && "rounded bg-neutral-900")}
        >
          {children}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <MenuItem
          Icon={FileText}
          onClick={() => createNote(isFolder ? id : parentId)}
        >
          New note
        </MenuItem>
        <MenuItem
          Icon={Folder}
          onClick={() => createFolder(isFolder ? id : parentId)}
        >
          New folder
        </MenuItem>
        {!isFolder && (
          <MenuItem Icon={Copy} onClick={() => copyNote(id, parentId)}>
            Copy note
          </MenuItem>
        )}
        {id !== "root" && (
          <>
            <ContextMenuSeparator />
            {isFolder && id !== "root" ? (
              <MenuItem Icon={Trash2} onClick={() => deleteFolder(id)}>
                Delete folder
              </MenuItem>
            ) : (
              <MenuItem Icon={Trash2} onClick={() => deleteNote(id)}>
                Delete note
              </MenuItem>
            )}
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

const MenuItem = ({
  children,
  Icon,
  onClick,
}: {
  children: ReactNode;
  Icon?: LucideIcon;
  onClick?: () => void;
}) => {
  return (
    <ContextMenuItem
      onClick={() => onClick && onClick()}
      className="flex gap-2 text-xs"
    >
      {Icon && <Icon className="h-4 w-4 text-neutral-500" />}
      {children}
    </ContextMenuItem>
  );
};
