import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PenLine, Trash2 } from "lucide-react";
import React from "react";

interface LinkPreviewProps {
  url: string;
  onClear: () => void;
  onEdit: () => void;
}

export const LinkPreview = ({ url, onClear, onEdit }: LinkPreviewProps) => {
  return (
    <div className="flex flex-row items-center gap-1 rounded border border-neutral-700 bg-neutral-950 px-2 py-0.5">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-sm text-neutral-400 underline"
      >
        {url}
      </a>
      <Separator orientation="vertical" className="ml-2 h-5 w-px" />
      <Button
        size="icon"
        variant="ghost"
        className="h-[unset] w-[unset] rounded border border-transparent p-1"
        onClick={onEdit}
        aria-label="Edit url"
      >
        <PenLine className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-[unset] w-[unset] rounded border border-transparent p-1"
        onClick={onClear}
        aria-label="Remove url"
      >
        <Trash2 className="h-4 w-4 text-red-400" />
      </Button>
    </div>
  );
};
