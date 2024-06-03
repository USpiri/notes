import { MenuGroup } from "@/models/menu.interface";
import {
  Bold,
  Code,
  CodeSquare,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  Lightbulb,
  Link,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  Quote,
  Sigma,
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
        inline: true,
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
        inline: true,
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
        inline: true,
        action: (editor) =>
          editor.chain().focus().toggleHeading({ level: 3 }).run(),
        shouldBeMarked: (editor) => editor.isActive("heading", { level: 3 }),
      },
      {
        name: "bold",
        label: "Bold",
        icon: Bold,
        description: "Bold text",
        inline: true,
        action: (editor) => editor.chain().focus().toggleBold().run(),
        shouldBeMarked: (editor) => editor.isActive("bold"),
      },
      {
        name: "Italic",
        label: "Italic",
        icon: Italic,
        description: "Italic text",
        inline: true,
        action: (editor) => editor.chain().focus().toggleItalic().run(),
        shouldBeMarked: (editor) => editor.isActive("italic"),
      },
      {
        name: "strike",
        label: "Strikehrough",
        icon: Strikethrough,
        description: "Strikethrough text",
        inline: true,
        action: (editor) => editor.chain().focus().toggleStrike().run(),
        shouldBeMarked: (editor) => editor.isActive("strike"),
      },
      {
        name: "underline",
        label: "Underline",
        icon: UnderlineIcon,
        description: "Underline text",
        inline: true,
        action: (editor) => editor.chain().focus().toggleUnderline().run(),
        shouldBeMarked: (editor) => editor.isActive("underline"),
      },
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
        inline: false,
        action: (editor) => editor.chain().focus().toggleBulletList().run(),
        shouldBeMarked: (editor) => editor.isActive("bulletList"),
      },
      {
        name: "numberedList",
        label: "Numbered list",
        icon: ListOrdered,
        description: "Numbered list",
        inline: false,
        action: (editor) => editor.chain().focus().toggleOrderedList().run(),
        shouldBeMarked: (editor) => editor.isActive("orderedList"),
      },
      {
        name: "checkList",
        label: "Check List",
        icon: ListTodo,
        description: "Check List",
        inline: false,
        action: (editor) => editor.chain().focus().toggleTaskList().run(),
        shouldBeMarked: (editor) => editor.isActive("taskList"),
      },
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
        inline: false,
        action: (editor) => editor.chain().focus().toggleBlockquote().run(),
        shouldBeMarked: (editor) => editor.isActive("blockquote"),
      },

      {
        name: "code",
        label: "Code",
        icon: Code,
        description: "Inline code style",
        inline: true,
        action: (editor) => editor.chain().focus().toggleCode().run(),
        shouldBeMarked: (editor) => editor.isActive("code"),
      },
      {
        name: "codeblock",
        label: "CodeBlock",
        icon: CodeSquare,
        description: "Code block",
        inline: false,
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

        inline: false,
        action: (editor) =>
          editor.chain().focus().enter().setHorizontalRule().run(),
      },
      {
        name: "link",
        label: "Insert Link",
        icon: Link,
        aliases: ["a", "anchor"],
        description: "Add external link",
        inline: true,
        action: (editor) => {
          const previousUrl = editor!.getAttributes("link").href;
          let url = window.prompt("URL", previousUrl);

          if (url === null) return;
          if (url === "") {
            editor!.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }

          const internalUrls = [
            "https://uspiri-notes.vercel.app/",
            "https://notes.uspiri.com/",
            "http://localhost:3000/",
          ];

          if (/^note=/.test(url)) url = `/?${url}`;

          const isInternalUrl =
            internalUrls.some((internal) => url.includes(internal)) ||
            /^\/?\?note=/.test(url);

          const target = isInternalUrl ? "_self" : "_blank";

          const rel = isInternalUrl ? "prefetch" : "noopener noreferrer";

          if (url.includes(""))
            editor!
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url, target, rel })
              .run();
        },
        shouldBeMarked: (editor) => editor.isActive("link"),
      },
      {
        name: "image",
        label: "Add Image",
        icon: Image,
        description: "Add image",
        inline: false,
        action: (editor) => {
          // TODO: Open with tippy
          const url = window.prompt("URL");

          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        },
      },
      {
        name: "callout",
        label: "Callout",
        icon: Lightbulb,
        description: "Add a callout",

        inline: false,
        action: (editor) => editor.chain().focus().toggleCallout().run(),
        shouldBeMarked: (editor) => editor.isActive("callout"),
      },
      {
        name: "math-display",
        label: "Math Display",
        icon: Sigma,
        description: "Add a math display",
        inline: false,
        action: (editor) => editor.chain().focus().toggleMathDisplay().run(),
        shouldBeMarked: (editor) => editor.isActive("math-display"),
      },
    ],
  },
];
