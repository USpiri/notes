"use client";

import { Editor, EditorContent, EditorOptions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import { EditorMenu } from "./EditorMenu";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import "./editor.css";
import Link from "@tiptap/extension-link";
import { SlashCommand } from "./extensions/slash-command/slash-command";
import Placeholder from "@tiptap/extension-placeholder";

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
    autofocus: true,
    extensions: [
      SlashCommand,
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
      Placeholder,
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
      <div
        className={cn(
          "mt-6",
          vertical ? "flex-1 px-4 md:px-8" : "w-full px-6 md:px-12",
        )}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
