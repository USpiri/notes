"use client";

import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import { EditorMenu } from "./EditorMenu";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import "./editor.css";
import Link from "@tiptap/extension-link";

export interface NoteEditorProps {
  editorConfig: {
    content: string;
    vertical?: boolean;
    editable?: boolean;
  };
  onUpdate?: (editor: Editor) => void;
}

export const NoteEditor = (props: NoteEditorProps) => {
  const { content, vertical = false } = props.editorConfig;

  const editor: Editor | null = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Link.configure({
        validate: (href) => /^https?:\/\//.test(href),
        linkOnPaste: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm focus:outline-none prose-invert prose-headings:font-medium prose-neutral max-w-none min-h-full",
      },
    },
  });

  if (!editor) return;

  return (
    <div className={cn("flex", vertical ? "flex-row" : "flex-col")}>
      <EditorMenu vertical={vertical} editor={editor} />
      <div className={cn("my-6 px-12", vertical ? "flex-1" : "w-full")}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
