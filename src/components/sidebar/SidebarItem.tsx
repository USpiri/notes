import { Note } from "@/models/note.interface";
import { useNoteStore } from "@/store/note-store";
import { FileText } from "lucide-react";
import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useState,
} from "react";

interface SidebarItemProps {
  note: Note;
}

export const SidebarItem = ({ note }: SidebarItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.title);

  const { setSelectedNote, updateNote } = useNoteStore((state) => ({
    setSelectedNote: state.setSelectedNote,
    updateNote: state.updateNote,
  }));

  const handleItemClick = () => {
    setSelectedNote(note);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text.length > 0) {
      updateNote(note.id, { ...note, title: text });
    } else {
      setText(note.title);
    }
  };

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      event.preventDefault();
      event.stopPropagation();
      updateNote(note.id, { ...note, title: text });
    }
  };

  return (
    <button
      className="flex w-full items-center gap-2 rounded px-2 py-1 transition-all hover:bg-neutral-800"
      onClick={handleItemClick}
    >
      <FileText className="h-4 w-4 text-neutral-500" />
      <div className="text-xs font-semibold" onDoubleClick={handleDoubleClick}>
        {isEditing ? (
          <input
            autoFocus
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleEnterKey}
            className="bg-transparent focus:outline-none"
          />
        ) : (
          <span>{text}</span>
        )}
      </div>
    </button>
  );
};
