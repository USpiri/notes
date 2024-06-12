import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { useEffect, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

// TODO: remove focus on blur
export const MathDisplay = ({ node }: NodeViewProps) => {
  const [latex, setLatex] = useState<string>("");

  useEffect(() => {
    const content = node.textContent.trim();
    if (content.length) {
      setLatex(
        katex.renderToString(node.textContent, {
          throwOnError: false,
          errorColor: "#ef4444",
          globalGroup: true,
          displayMode: true,
        }),
      );
    } else {
      setLatex("");
    }
  }, [node.textContent]);

  return (
    <NodeViewWrapper className="math-display">
      <div
        dangerouslySetInnerHTML={{ __html: latex }}
        className="math-render selec cursor-pointer rounded py-2 text-center transition-colors duration-150 hover:bg-neutral-900"
        contentEditable={false}
      />
      <div className="math-src rounded bg-[#050505] font-mono text-neutral-300">
        <NodeViewContent className="empty:content-['(empty)']" />
      </div>
    </NodeViewWrapper>
  );
};
