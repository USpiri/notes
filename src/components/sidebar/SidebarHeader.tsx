import { Button } from "@/components/ui/button";
import { useNoteStore } from "@/store/note-store";
import { FolderPlus, SquarePen } from "lucide-react";
import { ConfigDialog } from "../config-dialog/ConfigDialog";

export const SidebarHeader = () => {
  const createNote = useNoteStore((s) => s.createNote);
  const createFolder = useNoteStore((s) => s.createFolder);

  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => createNote()}
      >
        <SquarePen className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={() => createFolder()}
      >
        <FolderPlus className="h-3.5 w-3.5" />
      </Button>
      <ConfigDialog />
    </div>
  );
};
