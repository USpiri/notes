"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface NoteEditorProps {
  content: string;
}

export const NoteEditor = (props: NoteEditorProps) => {
  const { content } = props;

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none prose-invert prose-headings:font-medium prose-neutral",
      },
    },
  });
  return (
    <div>
      <div></div>
      <div className="w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
