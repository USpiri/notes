import { cn } from "@/lib/utils";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, { useCallback } from "react";

export const ImageBlock = ({
  editor,
  getPos,
  node,
  selected,
}: NodeViewProps) => {
  const { src, alt, align } = node.attrs;

  const wrapperClassName = cn(
    "block rounded",
    align === "left" ? "ml-0" : "ml-auto",
    align === "right" ? "mr-0" : "mr-auto",
    align === "center" && "mx-auto",
    selected && "ring-2 ring-neutral-500",
  );

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos());
  }, [getPos, editor.commands]);

  return (
    <NodeViewWrapper>
      <div contentEditable={false}>
        <img
          className={wrapperClassName}
          src={src}
          alt={alt}
          onClick={onClick}
        />
      </div>
    </NodeViewWrapper>
  );
};
