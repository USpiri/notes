"use client";

import { useEditorStore } from "@/store/config-store";
import { NoteEditor } from "../editor/NoteEditor";
import { Editor } from "@tiptap/react";
import { useDebouncedCallback } from "use-debounce";
import { useNoteStore } from "@/store/note-store";

export const Note = () => {
  const { updateNote, selectedNote } = useNoteStore((state) => ({
    updateNote: state.updateNote,
    selectedNote: state.selectedNote,
  }));

  const editor = useEditorStore((state) => ({
    vertical: state.vertical,
    editable: state.editable,
  }));

  const handleEditorUpdate = useDebouncedCallback((editor: Editor) => {
    if (!selectedNote) return;
    updateNote(selectedNote.id ?? "1", {
      ...selectedNote,
      content: editor.getHTML(),
    });
  }, 300);

  return (
    <NoteEditor
      editorConfig={editor}
      onUpdate={handleEditorUpdate}
      content={selectedNote?.content ?? ""}
    />
  );
};
