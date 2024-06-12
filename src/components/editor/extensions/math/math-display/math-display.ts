import {
  Node,
  ReactNodeViewRenderer,
  mergeAttributes,
  textblockTypeInputRule,
} from "@tiptap/react";
import { MathDisplay as MathDisplayComponent } from "./MathDisplayComponent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mathDisplay: {
      toggleMathDisplay: () => ReturnType;
      setMathDisplay: () => ReturnType;
    };
  }
}

const name = "mathDisplay";
const tag = "math-display";

export const MathDisplay = Node.create({
  name,
  group: "block math",
  content: "text*",
  defining: true,
  inline: false,
  code: true,

  parseHTML() {
    return [{ tag }];
  },

  renderHTML({ HTMLAttributes }) {
    return [tag, mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathDisplayComponent);
  },

  addInputRules() {
    return [textblockTypeInputRule({ find: /^(\$\$)[\s]$/, type: this.type })];
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () => {
        const { empty, $anchor } = this.editor.state.selection;
        const isAtStart = $anchor.pos === 1;

        if (!empty || $anchor.parent.type.name !== this.name) {
          return false;
        }
        if (isAtStart || !$anchor.parent.textContent.length) {
          return this.editor.commands.clearNodes();
        }

        return false;
      },

      // exit node on triple enter
      Enter: ({ editor }) => {
        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");

        if (!isAtEnd || !endsWithDoubleNewline) {
          return false;
        }

        return editor
          .chain()
          .command(({ tr }) => {
            tr.delete($from.pos - 2, $from.pos);
            return true;
          })
          .exitCode()
          .run();
      },

      ArrowDown: ({ editor }) => {
        const { state } = editor;
        const { selection, doc } = state;
        const { $from, empty } = selection;

        if (!empty || $from.parent.type !== this.type) {
          return false;
        }

        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;

        if (!isAtEnd) {
          return false;
        }

        const after = $from.after();

        if (after === undefined) {
          return false;
        }

        const nodeAfter = doc.nodeAt(after);

        if (nodeAfter) {
          return false;
        }

        return editor.commands.exitCode();
      },
    };
  },

  addCommands() {
    return {
      toggleMathDisplay:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph");
        },
      setMathDisplay:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },
});
