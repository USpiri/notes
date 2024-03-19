"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import "./sidebar.css";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside className="fixed z-20 bg-neutral-950 sm:relative sm:flex">
      <div
        className={cn(
          "sidebar sticky top-0 h-screen overflow-hidden border-r bg-neutral-950",
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
          className={cn(
            "fixed bottom-5 right-5 z-30 transition-transform sm:bottom-[unset] sm:right-[unset] sm:top-5 sm:ml-4",
            open && "sm:-translate-x-16",
          )}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </aside>
  );
};
