import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import {
  AlignEndVertical,
  AlignStartVertical,
  AlignVerticalSpaceAround,
} from "lucide-react";
import { useCallback } from "react";
import { ImageValidator } from "./ImageValidator";

export const ImageBlock = ({
  editor,
  getPos,
  node,
  selected,
  updateAttributes,
}: NodeViewProps) => {
  const { src, alt, align, width } = node.attrs;

  const wrapperClassName = cn(
    "block rounded",
    align === "left" ? "ml-0" : "ml-auto",
    align === "right" ? "mr-0" : "mr-auto",
    align === "center" && "mx-auto",
    selected && "ring-2 ring-neutral-500",
  );

  const borderClassName = cn(selected && "ring-2 ring-neutral-800");

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos());
  }, [getPos, editor.commands]);

  const onAlignImageLeft = useCallback(() => {
    updateAttributes({ align: "left" });
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    updateAttributes({ align: "center" });
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    updateAttributes({ align: "right" });
  }, [editor]);

  const onSizeChange = useCallback(
    (value: number[]) => {
      setTimeout(() => {
        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .setImageBlockWidth(value[0])
          .run();
      });
    },
    [editor],
  );

  return (
    <NodeViewWrapper>
      <div
        contentEditable={false}
        className={`relative rounded ${borderClassName}`}
        onClick={onClick}
      >
        <div>
          <ImageValidator
            src={src}
            alt={alt}
            className={wrapperClassName}
            width={width}
          />
        </div>
        {selected && (
          <div className="absolute right-2 top-2 flex flex-row items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1">
            <Button
              size="icon"
              variant={align === "left" ? "default" : "ghost"}
              className="h-[unset] w-[unset] rounded border border-transparent p-1 text-neutral-400 disabled:bg-neutral-800 disabled:text-neutral-500"
              aria-label="Align image left"
              onClick={onAlignImageLeft}
            >
              <AlignStartVertical className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={align === "center" ? "default" : "ghost"}
              className="h-[unset] w-[unset] rounded border border-transparent p-1 text-neutral-400 disabled:bg-neutral-800 disabled:text-neutral-500"
              aria-label="Align image center"
              onClick={onAlignImageCenter}
            >
              <AlignVerticalSpaceAround className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant={align === "right" ? "default" : "ghost"}
              className="h-[unset] w-[unset] rounded border border-transparent p-1 text-neutral-400 disabled:bg-neutral-800 disabled:text-neutral-500"
              aria-label="Align image right"
              onClick={onAlignImageRight}
            >
              <AlignEndVertical className="h-4 w-4" />
            </Button>
            <Slider
              className="w-32"
              defaultValue={[width]}
              step={25}
              min={25}
              onValueChange={onSizeChange}
            />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
