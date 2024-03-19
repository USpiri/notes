import { MenuGroup } from "@/models/menu.interface";
import {
  Bold,
  Code,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Lightbulb,
  Link,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  Quote,
  Strikethrough,
  UnderlineIcon,
} from "lucide-react";

export const MENU: MenuGroup[] = [
  {
    name: "format",
    title: "Format",
    commands: [
      {
        name: "heading1",
        label: "Heading 1",
        icon: Heading1,
        aliases: ["h1"],
        description: "Big section title",
        action: (editor) =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
        shouldBeMarked: (editor) => editor.isActive("heading", { level: 1 }),
      },
      {
        name: "heading2",
        label: "Heading 2",
        icon: Heading2,
        aliases: ["h2"],
        description: "Medium section title",
        action: (editor) =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
        shouldBeMarked: (editor) => editor.isActive("heading", { level: 2 }),
      },
      {
        name: "heading3",
        label: "Heading 3",
        icon: Heading3,
        aliases: ["h3"],
        description: "Small section title",
        action: (editor) =>
          editor.chain().focus().toggleHeading({ level: 3 }).run(),
        shouldBeMarked: (editor) => editor.isActive("heading", { level: 3 }),
      },
      {
        name: "bold",
        label: "Bold",
        icon: Bold,
        description: "Bold text",
        action: (editor) => editor.chain().focus().toggleBold().run(),
        shouldBeMarked: (editor) => editor.isActive("bold"),
      },
      {
        name: "Italic",
        label: "Italic",
        icon: Italic,
        description: "Italic text",
        action: (editor) => editor.chain().focus().toggleItalic().run(),
        shouldBeMarked: (editor) => editor.isActive("italic"),
      },
      {
        name: "strike",
        label: "Strikehrough",
        icon: Strikethrough,
        description: "Strikethrough text",
        action: (editor) => editor.chain().focus().toggleStrike().run(),
        shouldBeMarked: (editor) => editor.isActive("strike"),
      },
      // {
      //   name: "underline",
      //   label: "Underline",
      //   icon: UnderlineIcon,
      //   description: "Underline text",
      //   action: (editor) => editor.chain().focus().toggleUnderline().run(),
      //   shouldBeMarked: (editor) => editor.isActive("underline"),
      // },
    ],
  },
  {
    name: "lists",
    title: "Lists",
    commands: [
      {
        name: "bulletList",
        label: "Bullet List",
        icon: List,
        description: "Bullet list",
        action: (editor) => editor.chain().focus().toggleBulletList().run(),
        shouldBeMarked: (editor) => editor.isActive("bulletList"),
      },
      {
        name: "numberedList",
        label: "Numbered list",
        icon: ListOrdered,
        description: "Numbered list",
        action: (editor) => editor.chain().focus().toggleOrderedList().run(),
        shouldBeMarked: (editor) => editor.isActive("orderedList"),
      },
      // {
      //   name: "checkList",
      //   label: "Check List",
      //   icon: ListTodo,
      //   description: "Check List",
      //   action: (editor) => editor.chain().focus().toggleTaskList().run(),
      //   shouldBeMarked: (editor) => editor.isActive("taskList"),
      // },
    ],
  },
  {
    name: "blocks",
    title: "Blocks",
    commands: [
      {
        name: "quote",
        label: "Quote",
        icon: Quote,
        description: "Quote",
        action: (editor) => editor.chain().focus().toggleBlockquote().run(),
        shouldBeMarked: (editor) => editor.isActive("blockquote"),
      },

      {
        name: "code",
        label: "Code",
        icon: Code,
        description: "Inline code style",
        action: (editor) => editor.chain().focus().toggleCode().run(),
        shouldBeMarked: (editor) => editor.isActive("code"),
      },
      {
        name: "codeblock",
        label: "CodeBlock",
        icon: CodeSquare,
        description: "Code block",
        action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
        shouldBeMarked: (editor) => editor.isActive("codeBlock"),
      },
    ],
  },
  {
    name: "others",
    title: "Others",
    commands: [
      {
        name: "horizontal",
        label: "Horizontal rule",
        icon: Minus,
        aliases: ["hr"],
        description: "Horizontal rule",
        action: (editor) =>
          editor.chain().focus().enter().setHorizontalRule().run(),
      },
      // {
      //   name: "link",
      //   label: "Insert Link",
      //   icon: Link,
      //   aliases: ["a", "anchor"],
      //   description: "Add external link",
      //   action: (editor) => {
      //     const previousUrl = editor!.getAttributes("link").href;
      //     const url = window.prompt("URL", previousUrl);
      //
      //     if (url === null) return;
      //     if (url === "") {
      //       editor!.chain().focus().extendMarkRange("link").unsetLink().run();
      //       return;
      //     }
      //     editor!
      //       .chain()
      //       .focus()
      //       .extendMarkRange("link")
      //       .setLink({ href: url, target: "_blank" })
      //       .run();
      //   },
      //   shouldBeMarked: (editor) => editor.isActive("link"),
      // },
      // {
      //   name: "callout",
      //   label: "Callout",
      //   icon: Lightbulb,
      //   description: "Add a callout",
      //   action: (editor) => editor.chain().focus().toggleCallout().run(),
      //   shouldBeMarked: (editor) => editor.isActive("callout"),
      // },
    ],
  },
];
