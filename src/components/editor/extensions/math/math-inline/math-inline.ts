import {
  Content,
  InputRule,
  Node,
  ReactNodeViewRenderer,
  mergeAttributes,
} from "@tiptap/react";
import { MathInlineComponent } from "./MathInlineComponent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mathInline: {
      toggleMathInline: (attributes?: { latex: string }) => ReturnType;
    };
  }
}

const name = "mathInline";
const tag = "math-inline";
const inputRule = /\$([^\s])([^$]*)\$/;

export const MathInline = Node.create({
  name,
  group: "inline math",
  inline: true,
  selectable: true,
  atom: true,
  content: "text*",

  parseHTML() {
    return [{ tag }];
  },

  renderHTML({ HTMLAttributes }) {
    return [tag, mergeAttributes({ class: "math-node" }, HTMLAttributes), 0];
  },

  addInputRules() {
    return [
      new InputRule({
        find: inputRule,
        handler: (props) => {
          if (props.match[1].startsWith("$")) return;
          const latex = props.match[1] + props.match[2];
          const content: Content = [{ type: name, attrs: { latex } }];

          // Add attrs
          props
            .chain()
            .insertContentAt(
              { from: props.range.from, to: props.range.to },
              content,
              { updateSelection: true },
            )
            .run();
        },
      }),
    ];
  },

  addAttributes() {
    return {
      latex: {
        default: "x",
        parseHTML: (element) => element.getAttribute("data-latex"),
        renderHTML: (attributres) => ({ "data-latex": attributres.latex }),
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathInlineComponent);
  },

  addCommands() {
    return {
      toggleMathInline:
        (atributtes) =>
        ({ commands }) => {
          console.log(atributtes);

          return commands.wrapIn(this.type, atributtes);
        },
    };
  },
});
