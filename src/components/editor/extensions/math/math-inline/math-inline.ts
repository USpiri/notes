import {
  Content,
  InputRule,
  Node,
  mergeAttributes,
  PasteRule,
} from "@tiptap/core";
import katex from "katex";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    mathInline: {
      toggleMathInline: (attributes?: { latex: string }) => ReturnType;
    };
  }
}

export interface MathExtensionOption {
  katexOptions?: katex.KatexOptions;
}

const name = "mathInline";
const inputRule = /\$([^\s])([^$]*)\$/;

export const MathInline = Node.create<MathExtensionOption>({
  name,
  group: "inline",
  content: "text*",
  atom: true,
  inline: true,
  selectable: true,

  addAttributes() {
    return {
      latex: {
        default: "x_1",
        parseHTML: (element) => element.getAttribute("data-latex"),
        renderHTML: (attributes) => {
          return {
            "data-latex": attributes.latex,
          };
        },
      },
    };
  },

  addInputRules() {
    return [
      new InputRule({
        find: inputRule,
        handler: (props) => {
          if (props.match[1].startsWith("$")) return;
          const latex = (props.match[1] + props.match[2]).trim();
          const content: Content = [
            {
              type: this.name,
              attrs: { latex },
            },
          ];
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

  addPasteRules() {
    return [
      new PasteRule({
        find: new RegExp(inputRule, "g"),
        handler: (props) => {
          const latex = props.match[1] + props.match[2];
          props.chain().insertContentAt(
            { from: props.range.from, to: props.range.to },
            [
              {
                type: this.name,
                attrs: { latex },
              },
            ],
            { updateSelection: true },
          );
        },
      }),
    ];
  },

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    let latex = "x";
    if (node.attrs.latex && typeof node.attrs.latex == "string") {
      latex = node.attrs.latex;
    }
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": this.name,
      }),
      "$" + latex + "$",
    ];
  },

  addKeyboardShortcuts() {
    return {
      Backspace: () =>
        this.editor.commands.command(({ tr, state }) => {
          let isMath = false;
          const { selection } = state;
          const { empty, anchor } = selection;
          if (!empty) {
            return false;
          }
          state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
            if (node.type.name === this.name) {
              isMath = true;
              tr.insertText("$" + (node.attrs.latex || "") + "", pos, anchor);
            }
          });
          return isMath;
        }),
    };
  },

  addNodeView() {
    return ({ HTMLAttributes }) => {
      const outerSpan = document.createElement("span");
      const span = document.createElement("span");
      outerSpan.appendChild(span);

      let latex = "x_1";
      if (
        "data-latex" in HTMLAttributes &&
        typeof HTMLAttributes["data-latex"] === "string"
      ) {
        latex = HTMLAttributes["data-latex"];
      }

      katex.render(latex, span, {
        throwOnError: false,
        ...(this.options.katexOptions ?? {}),
      });

      outerSpan.classList.add("tiptap-math", "latex");
      return { dom: outerSpan };
    };
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
