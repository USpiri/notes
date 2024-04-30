import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { ChangeEvent, useEffect, KeyboardEvent, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import "./math-display.css";

export const MathDisplayComponent = (props: NodeViewProps) => {
  const { latex } = props.node.attrs;

  const [isEditing, setIsEditing] = useState(false);
  const [formula, setFormula] = useState(latex);

  const handleWrite = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setFormula(text);
  };

  const handleExit = () => {
    setIsEditing(false);
    props.updateAttributes({
      latex,
    });
  };

  const handleEnterKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      event.preventDefault();
      event.stopPropagation();
      props.updateAttributes({
        latex,
      });
    }
  };

  useEffect(() => {
    setFormula(katex.renderToString(latex, { throwOnError: false }));
    // console.log(katex.renderToString(latex));
  }, [setFormula, latex]);

  return (
    <NodeViewWrapper>
      <div
        className="flex w-full flex-col selection:bg-red-400"
        contentEditable={false}
        onBlur={handleExit}
      >
        {isEditing ? (
          <textarea
            rows={10}
            className="math-textarea mb-5 mt-2 h-10 rounded bg-neutral-700"
            onChange={handleWrite}
            value={latex}
            onKeyDown={handleEnterKey}
          />
        ) : (
          <div className="flex justify-center">
            <div
              onClick={() => setIsEditing(!isEditing)}
              dangerouslySetInnerHTML={{ __html: formula }}
              className="cursor-pointer select-none rounded px-2 py-1 transition-colors duration-150 hover:bg-neutral-800"
            ></div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
