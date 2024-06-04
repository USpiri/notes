import { Button } from "@/components/ui/button";
import { BubbleMenu, Editor } from "@tiptap/react";
import {
  AlignEndVertical,
  AlignStartVertical,
  AlignVerticalSpaceAround,
} from "lucide-react";
import { useCallback, useState } from "react";

interface ImageMenuProps {
  editor: Editor;
  appendTo?: React.RefObject<any>;
  shouldHide?: boolean;
}

export const ImageMenu = ({ editor }: ImageMenuProps) => {
  const shouldShow = useCallback(() => {
    const isActive = editor.isActive("imageBlock");
    return isActive;
  }, [editor]);

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
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
      }}
    >
      <div className="flex flex-row items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-1">
        <Button
          size="icon"
          variant="ghost"
          className="h-[unset] w-[unset] rounded border border-transparent p-1 text-neutral-400 disabled:bg-neutral-800 disabled:text-neutral-500"
          aria-label="Align image left"
          onClick={onAlignImageLeft}
          disabled={editor.getAttributes("imageBlock").align === "left"}
        >
          <AlignStartVertical className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-[unset] w-[unset] rounded border border-transparent p-1 text-neutral-400 disabled:bg-neutral-800 disabled:text-neutral-500"
          aria-label="Align image center"
          onClick={onAlignImageCenter}
          disabled={editor.getAttributes("imageBlock").align === "center"}
        >
          <AlignVerticalSpaceAround className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-[unset] w-[unset] rounded border border-transparent p-1 text-neutral-400 disabled:bg-neutral-800 disabled:text-neutral-500"
          aria-label="Align image right"
          onClick={onAlignImageRight}
          disabled={editor.getAttributes("imageBlock").align === "right"}
        >
          <AlignEndVertical className="h-4 w-4" />
        </Button>
      </div>
    </BubbleMenu>
  );
};
