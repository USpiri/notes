import {
  Node,
  ReactNodeViewRenderer,
  mergeAttributes,
  nodeInputRule,
} from "@tiptap/react";
import { MathDisplayComponent } from "./MathDisplayComponents";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mathDisplay: {
      toggleMathDisplay: () => ReturnType;
    };
  }
}

export const MathDisplay = Node.create({
  name: "mathDisplay",
  group: "block",
  atom: true,

  parseHTML() {
    return [{ tag: this.name }];
  },

  renderHTML({ HTMLAttributes }) {
    return [this.name, mergeAttributes(HTMLAttributes), 0];
  },

  addAttributes() {
    return {
      latex: {
        default: "x^2",
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathDisplayComponent);
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^\$\$?[\s\n]$/,
        type: this.type,
      }),
    ];
  },

  addCommands() {
    return {
      toggleMathDisplay:
        () =>
        ({ commands }) => {
          return commands.toggleWrap(this.name);
        },
    };
  },
});
