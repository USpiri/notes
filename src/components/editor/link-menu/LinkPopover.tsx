import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Link } from "lucide-react";
import React, { useState } from "react";
import { LinkEditor } from "./LinkEditor";

interface LinkPopoverProps {
  onSetLink: (link: string, openInNewTab?: boolean) => void;
}

export const LinkPopover = ({ onSetLink }: LinkPopoverProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label="Add link"
          size="icon"
          variant={selected ? "outline" : "ghost"}
          className="h-[unset] w-[unset] rounded border border-transparent p-1"
          onClick={() => setSelected(true)}
        >
          <Link className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex border-none p-0"
        onFocusOutside={() => setSelected(false)}
      >
        <LinkEditor onSetLink={onSetLink} />
      </PopoverContent>
    </Popover>
  );
};
