import { Editor } from "@tiptap/core";
import { LucideIcon } from "lucide-react";

export interface MenuGroup {
  name: string;
  title: string;
  commands: Command[];
}

export interface Command {
  name: string;
  label: string;
  description: string;
  aliases?: string[];
  inline: boolean;
  icon: LucideIcon;
  action: (editor: Editor) => void;
  shouldBeHidden?: (editor: Editor) => boolean;
  shouldBeMarked?: (editor: Editor) => boolean;
}
