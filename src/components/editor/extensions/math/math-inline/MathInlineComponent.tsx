import { cn } from "@/lib/utils";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import k from "katex";

const parseKatex = (text: string): string => {
  return k.renderToString(text, {
    throwOnError: false,
    errorColor: "#ef4444",
    globalGroup: true,
  });
};

export const MathInlineComponent = (props: NodeViewProps) => {
  const selected = props.selected;
  const { latex } = props.node.attrs;

  // Simple text
  const [formula, setFormula] = useState(latex);
  // Katext html
  const [katex, setKatex] = useState(parseKatex(latex));

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setKatexFormula();
  });

  const setKatexFormula = () => setKatex(parseKatex(formula));

  const updateProps = (formula: string) => {
    props.updateAttributes({ latex: formula });
  };

  const handleWrite = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setFormula(text);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const input = inputRef.current!;
    const pos = props.getPos();

    if (
      event.key === "Enter" ||
      event.key === "Escape" ||
      event.key === "ArrowDown" ||
      (event.key === "ArrowRight" &&
        input.selectionStart === input.value.length)
    ) {
      props.editor.commands.focus(pos + 2);
      updateProps(formula);
    }

    if (event.key === "ArrowLeft" && input.selectionStart === 0) {
      props.editor.commands.focus(pos - 1);
      updateProps(formula);
    }
  };

  return (
    <NodeViewWrapper as="span" className="inline">
      {!selected ? (
        <span
          className={cn(selected && "bg-red-400", "inline h-4 w-4 select-none")}
          dangerouslySetInnerHTML={{ __html: katex }}
          contentEditable={false}
        />
      ) : (
        <div className="inline overflow-hidden rounded bg-neutral-900 px-1 py-0.5">
          <span className="font-mono text-neutral-500">$</span>
          <span className="mx-1 rounded bg-neutral-800/50 py-0.5">
            <input
              ref={inputRef}
              autoFocus
              value={formula}
              onChange={handleWrite}
              onKeyDown={handleKeyPress}
              className="inline bg-transparent font-mono leading-none outline-none"
            />
          </span>
          <span className="font-mono text-neutral-500">$</span>
        </div>
      )}
    </NodeViewWrapper>
  );
};
