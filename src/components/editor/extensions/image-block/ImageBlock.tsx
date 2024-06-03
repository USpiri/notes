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
    align === "left" ? "ml-0" : "ml-auto",
    align === "right" ? "mr-0" : "mr-auto",
    align === "center" && "mx-auto",
  );

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos());
  }, [getPos, editor.commands]);

  return (
    <NodeViewWrapper>
      <div
        className={wrapperClassName}
        style={{ width: node.attrs.width }}
        contentEditable={false}
      >
        <img
          className={cn("block rounded", selected && "ring-1 ring-neutral-500")}
          src={src}
          alt={alt}
          onClick={onClick}
        />
      </div>
    </NodeViewWrapper>
  );
};
