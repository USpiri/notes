"use client";

import { NoteEditor } from "../editor/NoteEditor";
import { Editor } from "@tiptap/react";
import { useDebouncedCallback } from "use-debounce";
import { useNoteStore } from "@/store/note-store";
import { useConfigStore } from "@/store/config-store";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { contentList } from "@/lib/content";
import { Note as NoteI } from "@/models/note.interface";

const getSelectedNote = (id: string) => {
  if (typeof window === "undefined") return;
  return (
    JSON.parse(window.localStorage.getItem("note-store")!) as {
      state: { notes: NoteI[] };
    }
  ).state.notes.find((n) => n.id === id);
};

export const Note = () => {
  const searchParams = useSearchParams();
  const noteId = searchParams.get("note");
  const router = useRouter();
  const defaultContent = contentList[noteId!];
  const selectedNote = getSelectedNote(noteId!);
  const updateNote = useNoteStore((state) => state.updateNote);
  const [content, setContent] = useState(selectedNote?.content ?? "");
  const editor = useConfigStore((state) => ({
    vertical: state.vertical,
    editable: state.editable,
    inline: state.inline,
  }));

  const handleEditorUpdate = useDebouncedCallback((editor: Editor) => {
    if (!selectedNote) return;
    const newContent = editor.getHTML();
    updateNote(selectedNote!.id, {
      ...selectedNote!,
      content: newContent,
    });
  }, 300);

  useEffect(() => {
    validateContent();
  }, [noteId]);

  const validateContent = () => {
    setContent(selectedNote?.content ?? defaultContent);
    if (!selectedNote && !defaultContent) {
      router.push("/?note=U18DIC224RG");
    }
  };

  return (
    <NoteEditor
      editorConfig={editor}
      onUpdate={handleEditorUpdate}
      content={content}
    />
  );
};
