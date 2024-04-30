"use client";

import { NoteEditor } from "../editor/NoteEditor";
import { Editor } from "@tiptap/react";
import { useDebouncedCallback } from "use-debounce";
import { useNoteStore } from "@/store/note-store";
import { useEffect } from "react";
import { useConfigStore } from "@/store/config-store";

export const Note = () => {
  const updateNote = useNoteStore((state) => state.updateNote);
  const selectedNote = useNoteStore((state) => state.selectedNote);
  const setSelectedNote = useNoteStore((state) => state.setSelectedNote);

  const editor = useConfigStore((state) => ({
    vertical: state.vertical,
    editable: state.editable,
  }));

  const content = useConfigStore((state) => state.content);
  const setContent = useConfigStore((state) => state.setContent);

  const handleEditorUpdate = useDebouncedCallback((editor: Editor) => {
    if (!selectedNote) return;
    const newContent = editor.getHTML();
    console.log(newContent);
    
    setContent(newContent);
    updateNote(selectedNote.id, {
      ...selectedNote,
      content: newContent,
    });
  }, 300);

  useEffect(() => {
    const beforeUnload = () => {
      if (!selectedNote) return;
      setSelectedNote({ ...selectedNote, content });
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  });

  if (!selectedNote) return;

  return (
    <NoteEditor
      editorConfig={editor}
      onUpdate={handleEditorUpdate}
      content={selectedNote?.content ?? ""}
    />
  );
};
