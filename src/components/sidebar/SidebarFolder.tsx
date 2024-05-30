import { useNoteStore } from "@/store/note-store";
import { FolderIcon, FolderOpen } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { EditableLabel } from "../editable-label/EditableLabel";
import { FolderDropdownMenu } from "./FolderDropdownMenu";

interface SidebarFolderProps {
  id: string;
  text: string;
  isOpen: boolean;
  onClick?: () => void;
}

export const SidebarFolder = ({
  id,
  text,
  isOpen,
  onClick,
}: SidebarFolderProps) => {
  const updateFolderName = useNoteStore((s) => s.updateFolder);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = useDebouncedCallback(() => {
    if (isEditing) return;
    if (onClick) {
      onClick();
    }
  }, 150);

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
    <div className="flex items-center gap-2 rounded px-2 py-0.5 hover:bg-neutral-900">
      <div className="flex w-full items-center gap-2" onClick={handleToggle}>
        {!isOpen ? (
          <FolderIcon className="h-4 w-4 text-neutral-500" />
        ) : (
          <FolderOpen className="h-4 w-4 text-neutral-500" />
        )}
        <div className="flex-1 truncate" onDoubleClick={handleDoubleClick}>
          <EditableLabel
            text={text}
            isEditing={isEditing}
            onBlur={saveChanges}
            onEnterKey={saveChanges}
          />
        </div>
      </div>
      <FolderDropdownMenu
        id={id.toString()}
        onChangeName={handleChangeNameButton}
      />
    </div>
  );
};
