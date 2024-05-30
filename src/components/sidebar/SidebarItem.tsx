import { cn } from "@/lib/utils";
import { useNoteStore } from "@/store/note-store";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { EditableLabel } from "../editable-label/EditableLabel";
import { ItemDropdownMenu } from "./ItemDropdownMenu";

interface SidebarItemProps {
  id: string;
  text: string;
}

export const SidebarItem = ({ id, text }: SidebarItemProps) => {
  const updateFolderName = useNoteStore((s) => s.updateFolder);
  const [isEditing, setIsEditing] = useState(false);
  const searchParams = useSearchParams();
  const paramId = searchParams.get("note");

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const saveChanges = (value: string) => {
    setIsEditing(false);
    if (value.length > 0) {
      updateFolderName(id, value);
    }
  };

  const handleChangeNameButton = () => {
    setIsEditing(true);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded px-2 py-0.5 hover:bg-neutral-900",
        id === paramId && "bg-neutral-800",
      )}
    >
      <Link
        href={{ pathname: "/", query: { note: id } }}
        title={text}
        className="flex w-full items-center gap-2"
      >
        <FileText className="h-4 w-4 text-neutral-500" />
        <div className="flex-1 truncate" onDoubleClick={handleDoubleClick}>
          <EditableLabel
            text={text}
            isEditing={isEditing}
            onBlur={saveChanges}
            onEnterKey={saveChanges}
          />
        </div>
      </Link>
      <ItemDropdownMenu
        id={id.toString()}
        onChangeName={handleChangeNameButton}
      />
    </div>
  );
};
