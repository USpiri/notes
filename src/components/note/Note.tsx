"use client";

import { NoteEditor } from "../editor/NoteEditor";
import { Editor } from "@tiptap/react";
import { useDebouncedCallback } from "use-debounce";
import { findNoteById, useNoteStore } from "@/store/note-store";
import { useConfigStore } from "@/store/config-store";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MAIN, contentList } from "@/lib/content";
import { Folder } from "@/models/folder.interface";

export const Note = () => {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("note");
  const router = useRouter();

  const updateNote = useNoteStore((state) => state.updateNote);
  const root =
    typeof window !== "undefined"
      ? (
          JSON.parse(localStorage.getItem("note-store")!) as {
            state: { root: Folder };
          }
        ).state.root
      : { id: "", name: "", folders: [], notes: [] };
  const selectedNote = findNoteById(noteId!, root);
  const defaultContent = contentList[noteId!];
  const editor = useConfigStore((state) => ({
    vertical: state.vertical,
    editable: state.editable,
    inline: state.inline,
  }));

  const [content, setContent] = useState("");

  useEffect(() => {
    validateContent();
  }, [noteId]);

  const validateContent = () => {
    setContent(selectedNote?.content ?? defaultContent ?? MAIN);
    if (!selectedNote && !defaultContent) router.push("/?note=U18DIC224RG");
  };

  const handleEditorUpdate = useDebouncedCallback((editor: Editor) => {
    if (!selectedNote) return;
    const newContent = editor.getHTML();
    updateNote(selectedNote!.id, {
      ...selectedNote!,
      content: newContent,
    });
  }, 300);

  return (
    <NoteEditor
      editorConfig={editor}
      onUpdate={handleEditorUpdate}
      content={content}
    />
  );
};
