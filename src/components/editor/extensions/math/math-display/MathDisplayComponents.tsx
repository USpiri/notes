import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { ChangeEvent, useEffect, KeyboardEvent, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

export const MathDisplayComponent = (props: NodeViewProps) => {
  const { latex } = props.node.attrs;
  const selected = props.selected;

  const [isEditing, setIsEditing] = useState(false);
  const [formula, setFormula] = useState(latex);

  const setKatexFormula = () => {
    setFormula(katex.renderToString(latex, { throwOnError: false }));
  };

  const handleWrite = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    props.updateAttributes({
      latex: text,
    });
    setFormula(text);
  };

  const handleExit = () => {
    setIsEditing(false);
    props.updateAttributes({
      latex,
    });
  };

  const handleEnterKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.ctrlKey &&
      !event.altKey
    ) {
      setIsEditing(false);
      event.preventDefault();
      event.stopPropagation();
      props.updateAttributes({
        latex,
      });
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setKatexFormula();
  });

  return (
    <NodeViewWrapper>
      <div
        className={cn(
          "flex w-full flex-col rounded",
          selected && "outline outline-1 outline-neutral-700",
        )}
        onBlur={handleExit}
        onClick={handleClick}
        contentEditable={false}
      >
        {isEditing && (
          <textarea
            className="math-textarea mb-2 min-h-10 rounded bg-black/40 px-4 py-2 focus:outline-none"
            onChange={handleWrite}
            value={latex}
            onKeyDown={handleEnterKey}
            autoFocus
          />
        )}
        <div
          dangerouslySetInnerHTML={{ __html: formula }}
          className="cursor-pointer rounded p-2 text-center transition-colors duration-150 hover:bg-neutral-800"
        />
      </div>
    </NodeViewWrapper>
  );
};
