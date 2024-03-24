import { Node, ReactNodeViewRenderer, mergeAttributes } from "@tiptap/react";
import { Callout } from "./CalloutComponent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    callout: {
      toggleCallout: () => ReturnType;
    };
  }
}
export const CalloutExtension = Node.create({
  name: "callout",
  group: "block",
  content: "block*",

  parseHTML() {
    return [{ tag: this.name }];
  },

  renderHTML({ HTMLAttributes }) {
    return [this.name, mergeAttributes(HTMLAttributes), 0];
  },

  addAttributes() {
    return {
      name: {
        default: "note",
      },
      label: {
        default: "Note",
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(Callout);
  },

  addCommands() {
    return {
      toggleCallout:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
    };
  },
});
