"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import "./sidebar.css";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside className="fixed flex sm:relative">
      <div
        className={cn(
          "sidebar h-screen overflow-hidden border-r bg-neutral-950",
          open && "open",
        )}
      >
        <div className="w-64">
          <p className="text-sm opacity-50">Cooming soon...</p>
        </div>
      </div>
      <div>
        <Button
          onClick={() => setOpen(!open)}
          variant="outline"
          size="icon"
          className={cn("absolute top-2 sm:ml-2", open ? "-ml-12" : "ml-2")}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </aside>
  );
};
