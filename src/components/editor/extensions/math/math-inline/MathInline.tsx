import { NodeViewWrapper } from "@tiptap/react";
import React, { ChangeEvent, useEffect, useRef } from "react";
import katex from "katex";

export const MathInline = (props: any) => {
  const { latex } = props.node.attrs;
  console.log("RENDER");

  const containerRef = useRef<HTMLDivElement>(null);

  // const [isEditing, setIsEditing] = useState(false);

  const handleWrite = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    props.updateAttributes({
      latex: text,
    });
    katex.render(text, containerRef.current!);
  };

  useEffect(() => {
    katex.render(latex, containerRef.current!);
  });

  return (
    <div className="bg-red-400">
      <NodeViewWrapper>
        <textarea rows={10} onChange={handleWrite} />
        <div ref={containerRef} />
      </NodeViewWrapper>
    </div>
  );
};
