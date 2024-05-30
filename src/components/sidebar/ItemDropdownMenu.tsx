import { useNoteStore } from "@/store/note-store";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ItemDropdownMenuProps {
  id: string;
  onChangeName: () => void;
}

export const ItemDropdownMenu = ({
  id,
  onChangeName,
}: ItemDropdownMenuProps) => {
  const deleteFolder = useNoteStore((s) => s.deleteFolder);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded p-0.5 outline-none hover:bg-neutral-700/50">
        <EllipsisVertical size={15} className="text-neutral-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <DropdownMenuItem asChild>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onChangeName();
            }}
          >
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
  );
};
