import { Note } from "@/models/note.interface";
import { useNoteStore } from "@/store/note-store";
import { EllipsisVertical, FileText } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";

interface SidebarItemProps {
  note: Note;
}

export const SidebarItem = ({ note }: SidebarItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("note");

  const { updateNote, deleteNote } = useNoteStore((state) => ({
    updateNote: state.updateNote,
    deleteNote: state.deleteNote,
  }));

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
    validateText();
  };

  const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      event.preventDefault();
      event.stopPropagation();
      validateText();
    }
  };

  const validateText = () => {
    if (text.length > 0) {
      updateNote(note.id, { ...note, title: text });
    } else {
      setText(note.title);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-row rounded transition-colors hover:bg-neutral-800",
        note.id === id && "bg-neutral-800",
      )}
    >
      <Link
        href={{ pathname: "/", query: { note: note.id } }}
        className="flex w-full flex-1 items-center gap-2 overflow-hidden px-2 py-1"
        onDoubleClick={handleDoubleClick}
        title={text}
      >
        <FileText className="h-4 w-4 flex-none text-neutral-500" />
        <div className="truncate text-xs font-semibold">
          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleEnterKey}
              className="bg-transparent focus:outline-none"
              ref={inputRef}
            />
          ) : (
            <span>{text}</span>
          )}
        </div>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="m-0.5 rounded p-0.5 hover:bg-neutral-700/50">
          <EllipsisVertical className="h-4 w-4 text-neutral-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
          <DropdownMenuItem asChild>
            <button onClick={handleChangeName}>
              <span className="text-xs">Change name</span>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button onClick={() => deleteNote(note.id)}>
              <span className="text-xs">Delete</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
