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
}: NodeViewProps) => {
  const { src, alt, align } = node.attrs;

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
    console.log("SET SELECTION");
  }, [getPos, editor.commands]);

  const onAlignImageLeft = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("left")
      .run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("center")
      .run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("right")
      .run();
  }, [editor]);

  return (
    <NodeViewWrapper>
      <div
        contentEditable={false}
        className={`relative rounded ${borderClassName}`}
        onClick={onClick}
      >
        <ImageValidator className={wrapperClassName} src={src} alt={alt} />
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
              defaultValue={[25, 50, 75, 100]}
              step={25}
              inverted
            ></Slider>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
