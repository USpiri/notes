"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { Switch } from "../ui/switch";
import { useEditorStore } from "@/store/configStore";
import { CONTENT } from "@/lib/content";

export const ConfigDialog = () => {
  const { vertical, editable, setVertical, setEditable, setContent } =
    useEditorStore((state) => ({
      vertical: state.vertical,
      setVertical: state.setVertical,
      editable: state.editable,
      setEditable: state.setEditable,
      setContent: state.setContent,
    }));

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
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-sm">Reestablecer contenido</span>
            <Button variant="outline" onClick={() => setContent(CONTENT)}>
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
