import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import React, { Fragment } from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { MENU } from "./menu";

interface EditorMenuProps {
  vertical: boolean;
  editor: Editor;
}

export const EditorMenu = ({ vertical, editor }: EditorMenuProps) => {
  return (
    <div
      className={cn(
        "z-10 bg-neutral-950",
        vertical ? "flex" : "sticky top-0 block",
      )}
    >
      <Separator orientation={vertical ? "vertical" : "horizontal"} />
      <div>
        <div
          className={cn(
            "flex justify-start gap-1.5",
            vertical
              ? "sticky top-0 mx-1 flex-col py-2"
              : "mx-1 my-2 flex-wrap",
          )}
        >
          {MENU.map((group, index) => (
            <Fragment key={group.name}>
              {group.commands.map((command) => (
                <Button
                  key={command.name}
                  onClick={() => command.action(editor)}
                  size="icon"
                  title={command.label}
                  variant={
                    (command.shouldBeMarked &&
                      command.shouldBeMarked(editor)) ??
                    false
                      ? "outline"
                      : "ghost"
                  }
                >
                  <command.icon className="h-4 w-4" />
                </Button>
              ))}
              {index < MENU.length - 1 && (
                <Separator
                  className="hidden h-auto md:block"
                  orientation={vertical ? "horizontal" : "vertical"}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <Separator orientation={vertical ? "vertical" : "horizontal"} />
    </div>
  );
};
