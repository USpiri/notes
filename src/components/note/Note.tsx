"use client";

import { useEditorStore } from "@/store/configStore";
import { NoteEditor } from "../editor/NoteEditor";
import { Editor } from "@tiptap/react";

export const Note = () => {
  const editor = useEditorStore((state) => ({
    vertical: state.vertical,
    content: state.content,
    editable: state.editable,
  }));

  const { setContent } = useEditorStore((state) => ({
    setContent: state.setContent,
  }));

  const handleEditorUpdate = (editor: Editor) => {
    setContent(editor.getHTML());
  };

  return <NoteEditor editorConfig={editor} onUpdate={handleEditorUpdate} />;
};
