"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { Switch } from "../ui/switch";
import { useConfigStore } from "@/store/config-store";
import { Separator } from "../ui/separator";
import Link from "next/link";

const links = [
  { label: "Home", href: "/?note=U18DIC224RG" },
  { label: "Changelog", href: "/?note=changelog" },
  { label: "Syntax Higlight", href: "/?note=syntax" },
  { label: "Math Plugin", href: "/?note=math" },
  { label: "Routing", href: "/?note=routing" },
];

export const ConfigDialog = () => {
  const { vertical, editable, setVertical, setEditable } = useConfigStore(
    (state) => ({
      vertical: state.vertical,
      setVertical: state.setVertical,
      editable: state.editable,
      setEditable: state.setEditable,
    }),
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-7 w-7">
          <Settings className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editor Options</DialogTitle>
          <DialogDescription>
            Cambia la configuración del editor o reestablece el contenido.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Editable</span>
            <Switch checked={editable} onCheckedChange={setEditable} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Verical</span>
            <Switch checked={vertical} onCheckedChange={setVertical} />
          </div>

          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-sm">Inline (Próximamente...)</span>
            <Switch disabled={true} />
          </div>
          <Separator />
          <div className="flex flex-wrap items-center justify-center gap-5">
            {links.map((link) => (
              <DialogClose asChild key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-neutral-400"
                >
                  {link.label}
                </Link>
              </DialogClose>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
