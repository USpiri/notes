import {
  InputRule,
  Node,
  ReactNodeViewRenderer,
  mergeAttributes,
} from "@tiptap/react";
import { MathDisplayComponent } from "./MathDisplayComponents";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mathDisplay: {
      toggleMathDisplay: () => ReturnType;
    };
  }
}

const name = "mathDisplay";
const tag = "math-display";

export const MathDisplay = Node.create({
  name,
  group: "block math",
  content: "text*",
  atom: true,
  selectable: true,
  code: true,

  parseHTML() {
    return [{ tag }];
  },

  renderHTML({ HTMLAttributes }) {
    return [tag, mergeAttributes({ class: "math-node" }, HTMLAttributes), 0];
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
      new InputRule({
        find: /^(\$\$)[\s]$/,
        handler: ({ state, range }) => {
          const { tr } = state;
          const start = range.from;
          const end = range.to;

          tr.insert(start - 1, this.type.create()).delete(
            tr.mapping.map(start),
            tr.mapping.map(end),
          );
        },
      }),
    ];
  },

  addCommands() {
    return {
      toggleMathDisplay:
        () =>
        ({ commands }) => {
          commands.insertContent("<p></p>");
          return commands.toggleNode(this.name, "paragraph");
        },
    };
  },
});
