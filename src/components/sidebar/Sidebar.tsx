"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useConfigStore } from "@/store/config-store";
import { SidebarContent } from "./SidebarContent";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarMenuButton } from "./SidebarMenuButton";

import "./sidebar.css";

export const Sidebar = () => {
  const open = useConfigStore((state) => state.openMenu);

  return (
    <aside className="fixed z-20 bg-neutral-950 sm:relative sm:flex">
      <div
        className={cn(
          "sidebar sticky top-0 overflow-hidden border-r bg-neutral-950",
          open && "open",
        )}
      >
        <div className="flex h-screen w-screen flex-col gap-2 overflow-hidden px-2 py-4 sm:w-72">
          <SidebarHeader />
          <Separator />
          <SidebarContent />
          <Separator />
          <SidebarFooter />
        </div>
      </div>
      <div>
        <div className="fixed top-2 z-30 ml-2 flex flex-col gap-2 transition-transform md:top-5 md:ml-4">
          <SidebarMenuButton />
        </div>
      </div>
    </aside>
  );
};
