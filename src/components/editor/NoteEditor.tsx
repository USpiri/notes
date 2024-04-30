"use client";

import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import { EditorMenu } from "./EditorMenu";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import "./editor.css";
import Link from "@tiptap/extension-link";
import { SlashCommand } from "./extensions/slash-command/slash-command";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { CalloutExtension } from "./extensions/callout/callout";
import lowlight from "./extensions/lowlight-codeblock/lowlight";
import { Math } from "./extensions/math";

export interface NoteEditorProps {
  editorConfig: {
    vertical?: boolean;
    editable?: boolean;
  };
  content: string;
  onUpdate?: (editor: Editor) => void;
}

export const NoteEditor = (props: NoteEditorProps) => {
  const { vertical = false, editable = true } = props.editorConfig;
  const { onUpdate, content } = props;

  const editor = useEditor(
    {
      autofocus: true,
      extensions: [
        SlashCommand,
        StarterKit.configure({ codeBlock: false }),
        Underline,
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        Link.configure({
          validate: (href) => /^https?:\/\//.test(href),
          linkOnPaste: true,
        }),
        CalloutExtension,
        Placeholder,
        CodeBlockLowlight.configure({
          defaultLanguage: "plaintext",
          lowlight,
        }),
        Math,
      ],
      content,
      editable,
      editorProps: {
        attributes: {
          class:
            "prose prose-sm text-wrap focus:outline-none prose-invert prose-headings:font-medium prose-neutral max-w-none min-h-full",
        },
      },
      onUpdate: ({ editor }) => {
        if (onUpdate) {
          onUpdate(editor as Editor);
        }
      },
    },
    [content],
  );

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editable, editor]);

  if (!editor) return;

  return (
    <div className={cn("flex", vertical ? "flex-row" : "flex-col")}>
      <EditorMenu vertical={vertical} editable={editable} editor={editor} />
      <div
        className={cn(
          "mt-6 truncate",
          vertical ? "flex flex-1 px-4 md:px-8" : "w-full px-6 md:px-12",
        )}
      >
        <EditorContent editor={editor} className="w-full" />
      </div>
    </div>
  );
};
