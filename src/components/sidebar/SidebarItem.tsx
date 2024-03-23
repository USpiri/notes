import { FileText } from "lucide-react";
import React from "react";

interface SidebarItemProps {
  label: string;
  onClick: () => void;
}

export const SidebarItem = ({ label, onClick }: SidebarItemProps) => {
  return (
    <button
      className="flex w-full items-center gap-2 rounded px-2 py-1 transition-all hover:bg-neutral-800 active:scale-95"
      onClick={onClick}
    >
      <FileText className="h-4 w-4 text-neutral-500" />
      <div className="text-xs font-semibold">{label}</div>
    </button>
  );
};
